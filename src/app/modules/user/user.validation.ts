import { z } from "zod";
import { userRole } from "./user.constant";
import { location } from "../cow/cow.constants";

const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    password: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    address: z.enum([...location] as [string, ...string[]]).optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
};
