import userRoutes from "@routes/user.route";
import authRoutes from "@routes/auth.route";
import orderRoutes from "@routes/order.route";
import productRoutes from "@routes/product.route";

import express from "express"
const route = express.Router()
route.use("/user", userRoutes);
route.use("/order", orderRoutes);
route.use("/product", productRoutes);
route.use("/auth", authRoutes);

export default route;
