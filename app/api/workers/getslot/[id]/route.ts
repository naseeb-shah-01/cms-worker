import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectToDatabase } from "@/app/lib/db";
import Hours, { IHour } from "@/app/models/hours";

export async function GET(
  request: NextRequest,
  { params }: any
) {
  try {
    const workerId =  await params;
    
  

    await connectToDatabase();
    const userId = new mongoose.Types.ObjectId(workerId.id);


    const workerHour = await Hours.findOne({ user: userId })
    .sort({ createdAt: -1 })
    .lean()as IHour | null;
  
  if (!workerHour) {
    // Handle case where no hours found
    return null; // or throw an error
  }
  
  // Format single document
  const formattedHour = {
    _id: workerHour._id.toString(),
    user: workerHour.user.toString(),
    openTime: workerHour.openTime,
    closeTime: workerHour.closeTime,
    remark: workerHour.remark,
    createdAt: workerHour.createdAt?.toISOString(),
    updatedAt: workerHour.updatedAt?.toISOString(),
  };
  
  
    return NextResponse.json(
      { hours: formattedHour },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/workers/[id]/hours", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
