import express from "express"
import { getOrder,createOrder,updateOrder,deleteOrder, getListOrders } from "@/controller/order.controller";
import { protect } from "@middlewares/auth.middleware";
import { asyncHandler } from "@utils/asyncHandler";

const route = express.Router();

route.get("/",  asyncHandler(getOrder));
route.post("/", protect, asyncHandler(createOrder));
route.patch("/:id", protect, asyncHandler(updateOrder));
route.delete("/:id", protect, asyncHandler(deleteOrder));
route.get("/order-pip",getListOrders)

export default route;