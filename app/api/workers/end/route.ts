
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/app/lib/db";
import Hours from "@/app/models/hours";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { slotId, closeTime } = body;

    if (!slotId || !closeTime) {
      return NextResponse.json(
        { error: "Slot ID and close time are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Update the slot with close time
    const updatedSlot = await Hours.findByIdAndUpdate(
      slotId,
      { 
        closeTime:new Date(closeTime),
        updatedAt: new Date()
      },
      { new: true }
    ).lean() as any;

    if (!updatedSlot) {
      return NextResponse.json(
        { error: "Slot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Shift ended successfully",
      data: {
        _id: updatedSlot._id.toString(),
        user: updatedSlot.user.toString(),
        openTime: updatedSlot.openTime,
        closeTime: updatedSlot.closeTime,
        remark: updatedSlot.remark,
        createdAt: updatedSlot.createdAt?.toISOString(),
        updatedAt: updatedSlot.updatedAt?.toISOString(),
      }
    });

  } catch (error) {
    console.error("Error in PUT /api/workers/end", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}