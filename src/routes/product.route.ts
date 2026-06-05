import express from "express"
import { createProduct,updateProduct,getProduct,deleteProduct } from "../controller/product.controller";
import { protect } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const route = express.Router();

route.post("/product", protect,asyncHandler(createProduct));
route.get("/product",protect ,asyncHandler(getProduct));
route.patch("/product/:id", protect,asyncHandler(updateProduct));
route.delete("/product/:id", protect,asyncHandler(deleteProduct));


export default route;