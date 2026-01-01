import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import Hours, { IHour } from "@/app/models/hours";
import mongoose from "mongoose";

export  async function GET(
  request: Request,
  { params }: { params: { id: string } }
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
    const todaySlots: IHour[] = await Hours.find({
      user: workerId,
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday
      }
    }).sort({closeTime:1}).exec();
    return NextResponse.json(
      { slots: todaySlots },
      { status: 200 }
    );


  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
