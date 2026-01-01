import hours from "@/app/models/hours";
import { connectToDatabase } from "../db";

export async function getWorkerHours(workerId: string) {
  await connectToDatabase();
  const workerHours = await hours.find({ user: workerId }).lean();
  return workerHours.map((hour: any) => ({
    _id: hour?._id.toString(),
    worker: hour.worker.toString(),
    startTime: hour.startTime,
    endTime: hour.endTime,
    remark: hour.remark,
    createdAt: hour.createdAt?.toISOString(),
    updatedAt: hour.updatedAt?.toISOString(),
  }));
}

export const getTodayWorkerHours = async (workerId: string) => {
 console.log("getTodayWorkerHours called with workerId:", workerId);
 
  await connectToDatabase();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
console.log(workerId,typeof workerId)
  const todayHours = await hours.findOne({
    user: workerId,
    
  }).lean();

  return todayHours
}