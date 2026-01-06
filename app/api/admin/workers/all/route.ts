
import { NextResponse } from "next/server";


import { connectToDatabase } from "@/app/lib/db";
import { User } from "@/app/models/user";
import bcrypt from "bcryptjs";

 export async function GET(request: Request) {
try{




  
  await connectToDatabase();
const workers = await User.find({ role: "WORKER" }).select("-password -__v").lean();
    
    return NextResponse.json(
      { message: "Worker created successfully", workers: workers },
      { status: 201 }
    );

}catch(err){
return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}
 }