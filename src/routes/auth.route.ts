import {
  changePassword,
  login,
  register,
  refreshTokenController as refreshToken,
} from "@controllers/auth.controller";
import { validation } from "@middlewares/validate.middleware"
import { registerSchema,loginSchema,changePasswordSchema } from "@validators/auth.validation";

import express from "express"
import { protect } from "@middlewares/auth.middleware";
import { asyncHandler } from "@utils/asyncHandler";

const router = express.Router();

router.post("/register",validation(registerSchema), asyncHandler(register));
router.post("/login",  asyncHandler(login));
router.patch("/forget-password", protect, validation(changePasswordSchema),
    asyncHandler(changePassword));
router.post("/refresh-token",asyncHandler(refreshToken));


export default router;