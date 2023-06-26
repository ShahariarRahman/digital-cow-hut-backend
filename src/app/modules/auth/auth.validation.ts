import { z } from "zod";
import { userRole } from "../user/user.constant";
import { location } from "../cow/cow.constants";

const userSignupZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: "Role is required",
    }),
    password: z.string({
      required_error: "Password Number is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),
    address: z.enum([...location] as [string, ...string[]], {
      required_error: "Address is required",
    }),
    budget: z.number({
      required_error: "Budget is required",
    }),
    income: z.number({
      required_error: "Income is required",
    }),
  }),
});

export const AuthValidation = {
  userSignupZodSchema,
};
