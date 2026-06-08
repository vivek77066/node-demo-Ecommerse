"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.createProduct = void 0;
const product_service_1 = require("../service/product.service");
const createProduct = async (req, res) => {
    const productData = req.body;
    const product = await (0, product_service_1.creatProduct)(productData);
    res.status(201).send({
        success: true,
        data: product,
        message: "data successfully create"
    });
};
exports.createProduct = createProduct;
const getProduct = async (req, res) => {
    const productData = await (0, product_service_1.getProduct)();
    res.status(200).send({
        success: true,
        data: productData
    });
};
exports.getProduct = getProduct;
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { title, description, price, stock } = req.body;
    const productData = { title: title, description: description, price: price, stock: stock };
    const options = { returnDocument: "after" };
    const product = await (0, product_service_1.updateProduct)(productId, productData, options);
    if (!product) {
        res.status(500).send({
            success: false,
            message: "something went wrong"
        });
        return;
    }
    res.status(200).send({
        success: true,
        data: product
    });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    const product = await (0, product_service_1.deleteProduct)(productId);
    res.send({
        data: product,
        success: true,
        message: "Data is successfully deleted"
    });
};
exports.deleteProduct = deleteProduct;
