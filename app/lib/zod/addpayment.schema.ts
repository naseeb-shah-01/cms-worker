import { z } from "zod";

export const addPayment = z.object({
  user: z.string().min(1, "User is required"),
  admin: z.string().min(1, "Admin is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  remark: z.string().optional(),
});
export type AddPaymentType = z.infer<typeof addPayment>;