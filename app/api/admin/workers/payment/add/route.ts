import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import { addPayment } from "@/app/lib/zod/addpayment.schema";
import Payment from "@/app/models/payment";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    // Get session using authOptions
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized - Please login" },
        { status: 401 }
      );
    }
    
    
    const userId = session.user.id 
    const body = await request.json();
    body.admin=userId
    const validatedData = addPayment.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validatedData.error },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    
 
    const payment = new Payment(validatedData.data);
    await payment.save();
    
    return NextResponse.json(
      { 
        message: "Payment created successfully", 
        payment 
      },
      { status: 201 }
    );
  } catch(err) {
    console.error("Payment creation error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}