"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const asyncHandler_1 = require("../utils/asyncHandler");
const route = express_1.default.Router();
route.post("/product", auth_middleware_1.protect, (0, asyncHandler_1.asyncHandler)(product_controller_1.createProduct));
route.get("/product", auth_middleware_1.protect, (0, asyncHandler_1.asyncHandler)(product_controller_1.getProduct));
route.patch("/product/:id", auth_middleware_1.protect, (0, asyncHandler_1.asyncHandler)(product_controller_1.updateProduct));
route.delete("/product/:id", auth_middleware_1.protect, (0, asyncHandler_1.asyncHandler)(product_controller_1.deleteProduct));
exports.default = route;
