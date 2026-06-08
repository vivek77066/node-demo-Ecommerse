"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.creatProduct = void 0;
const product_model_1 = __importDefault(require("../model/product.model"));
const creatProduct = async (productData) => {
    return product_model_1.default.create(productData);
};
exports.creatProduct = creatProduct;
const getProduct = async () => {
    return product_model_1.default.find();
};
exports.getProduct = getProduct;
const updateProduct = async (productId, ProductData = {}, options = {}) => {
    return product_model_1.default.findByIdAndUpdate(productId, ProductData, options);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (productId) => {
    return product_model_1.default.findByIdAndDelete(productId);
};
exports.deleteProduct = deleteProduct;
