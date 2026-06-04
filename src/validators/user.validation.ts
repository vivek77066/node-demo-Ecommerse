import { z } from "zod";

export const addressSchema = z.object({
  city: z.string().min(2, "city is requuired"),
  dist: z.string().min(2, "district is required"),
  pincode: z.number().int().min(100000).max(900000),
});

export const replaceUserSchema = z.object({
  name: z.string().min(3),

  email: z.email(),

  age: z.number().min(0),

  phone: z.string().regex(/^[0-9]{10}$/),

  address: addressSchema,
});

export const updateUserSchema = z
  .object({
    name: z.string().min(3).optional(),

    email: z.email().optional(),

    age: z.number().min(0).optional(),

    phone: z
      .string()
      .regex(/^[0-9]{10}$/)
      .optional(),

    address: addressSchema.optional(),
  })
  .passthrough();

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;