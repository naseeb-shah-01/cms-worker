import { z } from "zod";

export const CloseHourSchema = z.object({
  day: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date",
  }),

  openTime: z.number().int().positive({
    message: "Open time must be a valid timestamp",
  }),

  closeTime: z
    .number()
    .int()
    .positive({
      message: "Close time must be a valid timestamp",
    })
    .optional(),

  remark: z.string().min(1, {
    message: "Remark is required",
  }),
});
