"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.replaceUserSchema = exports.addressSchema = void 0;
const zod_1 = require("zod");
exports.addressSchema = zod_1.z.object({
    city: zod_1.z.string().min(2, "city is requuired"),
    dist: zod_1.z.string().min(2, "district is required"),
    pincode: zod_1.z.number().int().min(100000).max(900000),
});
exports.replaceUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.email(),
    age: zod_1.z.number().min(0),
    phone: zod_1.z.string().regex(/^[0-9]{10}$/),
    address: exports.addressSchema,
});
exports.updateUserSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(3).optional(),
    email: zod_1.z.email().optional(),
    age: zod_1.z.number().min(0).optional(),
    phone: zod_1.z
        .string()
        .regex(/^[0-9]{10}$/)
        .optional(),
    address: exports.addressSchema.optional(),
})
    .passthrough();
