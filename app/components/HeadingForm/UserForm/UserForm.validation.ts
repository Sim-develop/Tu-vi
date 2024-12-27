import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string(),
    gender: z.string(),
    day: z.string(),
    month: z.string(),
    year: z.string(),
    hour: z.string(),
    mins: z.string(),
    isLunar: z.boolean(),
    viewedYear: z.string(),
  })
  .superRefine((data, ctx) => {
    if (Number(data.viewedYear) < Number(data.year)) {
      ctx.addIssue({
        path: ["viewedYear"],
        code: z.ZodIssueCode.custom,
        message: "Năm xem phải lớn hơn năm sinh",
      });
    }
    if (Number(data.viewedYear) - 120 > Number(data.year)) {
      ctx.addIssue({
        path: ["viewedYear"],
        code: z.ZodIssueCode.custom,
        message: `Năm xem không hợp lệ`,
      });
    }
  });
