
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { CreateWorkerSchema

 } from "@/app/lib/zod/worker.schema";
import { connectToDatabase } from "@/app/lib/db";
import { User } from "@/app/models/user";
import bcrypt from "bcryptjs";

 export async function POST(request: Request) {
try{

const body = await request.json();
const validatedData = CreateWorkerSchema.safeParse(body);

if (!validatedData.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: validatedData.error },
      { status: 400 }
    );
  }
  
  await connectToDatabase();
const password=validatedData.data.email.split("@")[0] + validatedData.data.name.slice(0,4).toUpperCase()

  validatedData.data.password= await bcrypt.hash(password, 10);
    const newWorker = new User(validatedData.data);
    await newWorker.save();
    return NextResponse.json(
      { message: "Worker created successfully", worker: newWorker },
      { status: 201 }
    );

}catch(err){
return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}
 }