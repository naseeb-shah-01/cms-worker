export interface TimeEntry {
    _id: string;
    user: string;
    openTime: Date;
    closeTime?: Date;
    remark: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  
  export interface DayHours {
    _id: string; // "YYYY-MM-DD"
    totalHours: number;
    entries: TimeEntry[];
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    hourlyRate: number;
    role: "WORKER" | "ADMIN";
    isActive: boolean;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    hours: DayHours[];
  }
  
  // For API responses that return string dates
  export interface ApiTimeEntry extends Omit<TimeEntry, 'openTime' | 'closeTime' | 'createdAt' | 'updatedAt'> {
    openTime: string;
    closeTime?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ApiUser extends Omit<User, 'createdAt' | 'updatedAt' | 'hours'> {
    createdAt: string;
    updatedAt: string;
    hours: Array<Omit<DayHours, 'entries'> & { entries: ApiTimeEntry[] }>;
  }