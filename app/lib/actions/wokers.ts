import { User } from "@/app/models/user";
import { connectToDatabase } from "../db";




export async function getAllWorkers(){
  await  connectToDatabase()
    const allWorkers= await User.find({}).lean();
    return allWorkers.map((worker:any) => ({
        _id: worker?._id.toString(),
        name: worker.name,
        email: worker.email,
        phone: worker.phone ?? null,
        hourlyRate: worker.hourlyRate,
        role: worker.role,
        isActive: worker.isActive,
        createdAt: worker.createdAt?.toISOString(),
        updatedAt: worker.updatedAt?.toISOString(),
      }));

}