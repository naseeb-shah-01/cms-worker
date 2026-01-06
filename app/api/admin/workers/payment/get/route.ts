import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import Payment from "@/app/models/payment";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    
    const session = await getServerSession(authOptions);
    
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized - Please login" },
        { status: 401 }
      );
    }
    
    const userId = session.user.id 
    
    await connectToDatabase();
    
    
    const body = await request.json();
    const { page = 1, limit = 50, ...filters } = body;
    
    
    const query = {  } as any;
    
   
    
 
    

    
    
    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      
      if (filters.startDate) {
        query.createdAt.$gte = new Date(filters.startDate);
      }
      
      if (filters.endDate) {
        query.createdAt.$lte = new Date(filters.endDate);
      }
    }
    
    
    const skip = (page - 1) * limit;
    
    console.log("Payment query:", query, "Skip:", skip, "Limit:", limit);
    const payments = await Payment.find(query).populate('user', 'email name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    
    
    const totalCount = await Payment.countDocuments(query);
    
    
    const totalStats = await Payment.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
          avgAmount: { $avg: "$amount" }
        }
      }
    ]);
    
    return NextResponse.json(
      { 
        message: "Payments retrieved successfully", 
        data: {
          payments: payments,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: totalCount,
            pages: Math.ceil(totalCount / limit)
          },
          summary: totalStats[0] || {
            totalAmount: 0,
            count: 0,
            avgAmount: 0
          }
        }
      },
      { status: 200 }
    );
  } catch(err) {
    console.error("Payment retrieval error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}