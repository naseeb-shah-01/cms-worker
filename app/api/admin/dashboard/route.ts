import { connectToDatabase } from '@/app/lib/db';
import { User } from '@/app/models/user';
import  Hours from '@/app/models/hours';
import { NextRequest, NextResponse } from 'next/server';




export async function GET(request: NextRequest) {
  try {
     await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const department = searchParams.get('department') || '';
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { jotTitle: { $regex: search, $options: 'i' } }
      ];
    }

    if (department) {
      query.jotTitle = department;
    }

    // Get workers with pagination
    const workers = await User.find(query)
      .select('-password -__v')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Get current month's date range
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Calculate hours and costs for each worker
    const workersWithStats = await Promise.all(
      workers.map(async (worker) => {
        // Get hours for current month
        const hours = await Hours.find({
          user: worker._id,
          openTime: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
          closeTime: { $exists: true }
        });

        // Calculate total hours
        const totalHours = hours.reduce((sum, hour) => {
          if (hour.closeTime) {
            const openTime = new Date(hour.openTime);
            const closeTime = new Date(hour.closeTime);
            const hoursWorked = (closeTime.getTime() - openTime.getTime()) / (1000 * 60 * 60);
            return sum + hoursWorked;
          }
          return sum;
        }, 0);

        // Calculate total cost
        const totalCost = totalHours * (worker.hourlyRate || 0);

        // Calculate efficiency (you can adjust this formula based on your needs)
        const efficiency = Math.min(95, 70 + Math.random() * 25); // Mock efficiency for now

        // Check if over budget (assuming budget is hourlyRate * 160 hours/month)
        const monthlyBudget = (worker.hourlyRate || 0) * 160;
        const isOverBudget = totalCost > monthlyBudget;

        return {
          ...worker,
          
          totalHoursThisMonth: parseFloat(totalHours.toFixed(2)),
          totalCostThisMonth: parseFloat(totalCost.toFixed(2)),
          efficiency: parseFloat(efficiency.toFixed(1)),
          isOverBudget,
          lastActive: hours.length > 0 
            ? hours[0].openTime.toISOString().split('T')[0]
            : 'No activity'
        };
      })
    );

    // Calculate summary statistics
    const totalWorkers = await User.countDocuments();
    const activeWorkers = await User.countDocuments({ isActive: true });
    
    const allHours = workersWithStats.reduce((sum, worker) => sum + worker.totalHoursThisMonth, 0);
    const allCosts = workersWithStats.reduce((sum, worker) => sum + worker.totalCostThisMonth, 0);
    const avgEfficiency = workersWithStats.length > 0 
      ? workersWithStats.reduce((sum, worker) => sum + worker.efficiency, 0) / workersWithStats.length
      : 0;

    // Get department breakdown
    const departments = await User.aggregate([
      { $group: {
          _id: '$jotTitle',
          count: { $sum: 1 },
          avgHourlyRate: { $avg: '$hourlyRate' }
      }},
      { $match: { _id: { $ne: null } } }
    ]);

    // Prepare response
    const response = {
      success: true,
      data: {
        workers: workersWithStats,
        summary: {
          totalWorkers,
          activeWorkers,
          totalHours: parseFloat(allHours.toFixed(2)),
          totalCost: parseFloat(allCosts.toFixed(2)),
          avgEfficiency: parseFloat(avgEfficiency.toFixed(1)),
          costTrend: 5.7, // You can calculate actual trend from previous months
          hoursTrend: 3.2  // You can calculate actual trend from previous months
        },
        departments: departments.map(dept => ({
          id: dept._id,
          name: dept._id,
          totalWorkers: dept.count,
          totalHours: allHours * (dept.count / totalWorkers), // Approximation
          totalCost: allCosts * (dept.count / totalWorkers), // Approximation
          avgEfficiency: avgEfficiency // Approximation
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      },
      message: 'Workers data retrieved successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching workers:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch workers data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}