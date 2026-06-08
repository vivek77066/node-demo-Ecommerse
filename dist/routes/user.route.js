"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const user_validation_1 = require("../validators/user.validation");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = express_1.default.Router();
router.patch("/user/:id", auth_middleware_1.protect, (0, validate_middleware_1.default)(user_validation_1.updateUserSchema), (0, asyncHandler_1.asyncHandler)(user_controller_1.updateUser));
router.put("user/replace/:id", auth_middleware_1.protect, (0, validate_middleware_1.default)(user_validation_1.replaceUserSchema), (0, asyncHandler_1.asyncHandler)(user_controller_1.replaceUser));
router.delete("/user/:id", auth_middleware_1.protect, (0, asyncHandler_1.asyncHandler)(user_controller_1.deleteUser));
router.get("/user", auth_middleware_1.protect, (0, asyncHandler_1.asyncHandler)(user_controller_1.getUsers));
exports.default = router;
