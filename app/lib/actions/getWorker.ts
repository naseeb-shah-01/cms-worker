import { User } from "@/app/models/user";
import { connectToDatabase } from "../db";
import Hours from "@/app/models/hours";

interface GetWorkerOptions {
  month?: number; // 0-11
  year?: number; // e.g., 2024
}

export async function getWorker(_id: string, options?: GetWorkerOptions) {
  await connectToDatabase();
  
  const worker = await User.findOne({ _id }).lean();
  
  if (!worker) {
    return null;
  }

  let dateFilter = {};
  
  if (options?.month !== undefined) {
    // If month is provided
    const year = options.year || new Date().getFullYear();
    const month = options.month;
    
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);
    
    dateFilter = {
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    };
  } else {
    // Default: last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    dateFilter = {
      createdAt: {
        $gte: thirtyDaysAgo,
        $lte: new Date()
      }
    };
  }
  

  const hours = await Hours.aggregate([
    {
      $match: {
        
        ...dateFilter
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $group:{
   _id:     { 
          $dateToString: { 
            format: "%Y-%m-%d", 
            date: "$createdAt" 
          } 
        },
        totalHours: { $sum: {$round:[ {
          $divide: [
            { $subtract: ["$closeTime", "$openTime"] },
            1000 * 60 * 60
          ]
        } ,2]}},
        entries: { $push: "$$ROOT" }
      },
    }
  
  ])

  return {
    ...worker,
    hours
  };
}

