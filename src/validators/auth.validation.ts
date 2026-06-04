import { z } from "zod";
import { addressSchema } from "./user.validation";


export const changePasswordSchema = z.object({
  oldPassword: z.string().min(5),

  newPassword: z.string().min(5).max(50),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),

  email: z.email("Invalid email"),

  password: z.string().min(5, "Password must be at least 8 characters"),

  age: z.number().min(0, "Age must be at least 18"),

  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),

  address: addressSchema,
});