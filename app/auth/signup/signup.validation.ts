"use client";

import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(255),
    re_password: z.string().min(8).max(255),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.re_password) {
      ctx.addIssue({
        path: ["re_password"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });
