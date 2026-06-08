"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controller/order.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const asyncHandler_1 = require("../utils/asyncHandler");
const route = express_1.default.Router();
route.get("/order", auth_middleware_1.protect, (0, asyncHandler_1.asyncHandler)(order_controller_1.getOrder));
route.post("/order", auth_middleware_1.protect, (0, asyncHandler_1.asyncHandler)(order_controller_1.createOrder));
route.patch("/order/:id", auth_middleware_1.protect, (0, asyncHandler_1.asyncHandler)(order_controller_1.updateOrder));
route.delete("/order/:id", auth_middleware_1.protect, (0, asyncHandler_1.asyncHandler)(order_controller_1.deleteOrder));
exports.default = route;
