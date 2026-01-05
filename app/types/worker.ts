
export interface MongoBase {
  _id: string;
  __v?: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


export interface HourEntry extends MongoBase {
  user: string;          // ObjectId as string
  openTime: string;      // ISO date
  closeTime?: string;    // optional (if not closed)
  remark: string;
}


export interface DailyHours {
  _id: string;           
  totalHours: number;
  entries: HourEntry[];
}


export type UserRole = "ADMIN" | "USER" | "MANAGER";


export interface User extends MongoBase {
  name: string;
  email: string;
  phone: string;
  hourlyRate: number;
  role: UserRole;
  isActive: boolean;
  hours: DailyHours[];
}
