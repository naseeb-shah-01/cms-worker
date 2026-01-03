import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import Hours, { IHour } from "@/app/models/hours";
import mongoose from "mongoose";

export  async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userDetails= await params;
    if (!userDetails?.id) {
      return NextResponse.json(
        { message: "Worker ID is required",params:params },
        { status: 400 }
      );
    }
const workerId =  new mongoose.Types.ObjectId(userDetails.id);
let startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);
let endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000 - 1);
    await connectToDatabase();
    const todaySlots: IHour[] = await Hours.aggregate([

      {
        $match: {
          user: workerId,
          closeTime:{$ne:null}
        },
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
    return NextResponse.json(
      { data: todaySlots },
      { status: 200 }
    );


  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
