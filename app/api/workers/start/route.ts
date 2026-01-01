import  Hours  from "@/app/models/hours";

import { NextResponse } from "next/server";
import { StartHourSchema } from "@/app/lib/zod/starthour.schema";
import mongoose from "mongoose";

import { connectToDatabase } from "@/app/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await request.json();
    
    const validatedData = StartHourSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validatedData.error },
        { status: 400 }
      );
    }
    await connectToDatabase();
    
    const newHour = new Hours({
      day: validatedData.data.day,
      openTime: new Date(validatedData.data.openTime),
      closeTime: validatedData.data.closeTime
        ? new Date(validatedData.data.closeTime)
        : undefined,
      remark: validatedData.data.remark,
      user: session.user?.id
    });
    await newHour.save();
    return NextResponse.json(
      { message: "Work started successfully", hour: newHour },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in /api/workers/start:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
