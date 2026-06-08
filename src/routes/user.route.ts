import express from "express"
import { getUsers, updateUser, deleteUser, replaceUser } from "@controllers/user.controller";
import { protect } from "@middlewares/auth.middleware";
import validation from "@middlewares/validate.middleware";
import { updateUserSchema, replaceUserSchema, } from "@validators/user.validation";
import { asyncHandler } from "@utils/asyncHandler";
const router = express.Router();


router.patch("/:id", protect,validation(updateUserSchema), asyncHandler(updateUser));
router.put("/:id",protect,validation(replaceUserSchema), asyncHandler(replaceUser))
router.delete("/:id", protect, asyncHandler(deleteUser));
router.get("/", protect, asyncHandler(getUsers));

export default router;

