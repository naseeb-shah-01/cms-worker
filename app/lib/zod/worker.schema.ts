import { z } from "zod";

export const CreateWorkerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email(),
  phone: z.string().optional(),
  hourlyRate: z.number().positive("Hourly rate must be positive"),
  jobTitle: z.string().min(2, "Job title is too short"),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
});
