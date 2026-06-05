import express from "express"
import { getOrder,createOrder,updateOrder,deleteOrder } from "../controller/order.controller";
import { protect } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const route = express.Router();

route.get("/order", protect, asyncHandler(getOrder));
route.post("/order", protect, asyncHandler(createOrder));
route.patch("/order/:id", protect, asyncHandler(updateOrder));
route.delete("/order/:id", protect, asyncHandler(deleteOrder));

export default route;