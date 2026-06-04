import express from "express"
import { getUsers, updateUser, deleteUser, replaceUser } from "../controller/user.controller";
import { protect } from "../middleware/auth.middleware";
import validation from "../middleware/validate.middleware";
import { updateUserSchema, replaceUserSchema, } from "../validators/user.validation";
import { asyncHandler } from "../utils/asyncHandler";
const router = express.Router();


router.patch("/user/:id", protect,validation(updateUserSchema), asyncHandler(updateUser));
router.put("user/replace/:id",protect,validation(replaceUserSchema), asyncHandler(replaceUser))
router.delete("/user/:id", protect, asyncHandler(deleteUser));
router.get("/user", protect, asyncHandler(getUsers));

export default router;

