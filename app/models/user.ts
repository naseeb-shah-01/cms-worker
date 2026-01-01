import mongoose, { Schema, models } from "mongoose";
import { Inter } from "next/font/google";
import { Interface } from "readline";


export interface IUser{
  name: string;
  email: string;
  phone?: string;
  hourlyRate?: number;
  jotTitle?: string;
  role?: string;
  isActive?: boolean;
  password: string;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    hourlyRate: { type: Number},
    jotTitle: { type: String },
    role: { type: String, default: "WORKER" },
    isActive: { type: Boolean, default: true },
    password: String,
  },
  { timestamps: true }
);

export const User =
  models?.User || mongoose.model("User", UserSchema);
