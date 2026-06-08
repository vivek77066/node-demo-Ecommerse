"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controller/auth.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_validation_1 = require("../validators/auth.validation");
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = express_1.default.Router();
router.post("/register", (0, validate_middleware_1.validation)(auth_validation_1.registerSchema), (0, asyncHandler_1.asyncHandler)(auth_controller_1.register));
router.post("/login", (0, validate_middleware_1.validation)(auth_validation_1.loginSchema), (0, asyncHandler_1.asyncHandler)(auth_controller_1.login));
router.patch("/forget-password", auth_middleware_1.protect, (0, validate_middleware_1.validation)(auth_validation_1.changePasswordSchema), (0, asyncHandler_1.asyncHandler)(auth_controller_1.changePassword));
router.post("/refresh-token", (0, asyncHandler_1.asyncHandler)(auth_controller_1.refreshTokenController));
exports.default = router;
