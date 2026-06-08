"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = exports.changePasswordSchema = void 0;
const zod_1 = require("zod");
const user_validation_1 = require("./user.validation");
exports.changePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string().min(5),
    newPassword: zod_1.z.string().min(5).max(50),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(1),
});
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(3, "Name must be at least 3 characters"),
    email: zod_1.z.email("Invalid email"),
    password: zod_1.z.string().min(5, "Password must be at least 8 characters"),
    age: zod_1.z.number().min(0, "Age must be at least 18"),
    phone: zod_1.z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
    address: user_validation_1.addressSchema,
});
