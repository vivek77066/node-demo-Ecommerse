import express from "express"
import { createProduct,updateProduct,getProduct,deleteProduct } from "@controllers/product.controller";
import { protect } from "@middlewares/auth.middleware";
import { asyncHandler } from "@utils/asyncHandler";

const route = express.Router();

route.post("/", protect,asyncHandler(createProduct));
route.get("/",protect ,asyncHandler(getProduct));
route.patch("/:id", protect,asyncHandler(updateProduct));
route.delete("/:id", protect,asyncHandler(deleteProduct));


export default route;