import { changePassword, login, register } from "../controller/auth.controller";
import { validation } from "../middleware/validate.middleware"
import { registerSchema,loginSchema,changePasswordSchema } from "../validators/auth.validation";

import express from "express"
import { protect } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.post("/register",validation(registerSchema), asyncHandler(register));
router.post("/login", validation(loginSchema), asyncHandler(login));
router.patch("/forget-password", protect, validation(changePasswordSchema),asyncHandler(changePassword));


export default router;