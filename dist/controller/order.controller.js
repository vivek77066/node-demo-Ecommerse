"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.deleteOrder = exports.createOrder = exports.getOrder = void 0;
const order_service_1 = require("../service/order.service");
const getOrder = async (req, res) => {
    const orderData = req.body;
    const order = await (0, order_service_1.getOrder)();
    res.status(201).send({
        data: order,
        success: true,
    });
};
exports.getOrder = getOrder;
const createOrder = async (req, res) => {
    const orderData = req.body;
    const order = await (0, order_service_1.createOrder)(orderData);
    res.status(201).send({
        data: order,
        success: true
    });
};
exports.createOrder = createOrder;
const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    await (0, order_service_1.deleteOrder)(orderId);
    res.status(200).send({
        success: true,
        message: "data is successfully deleted "
    });
};
exports.deleteOrder = deleteOrder;
const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const { user, items, totalAmount, status } = req.body;
    const updateOrderData = {
        user: user,
        items: items,
        totalAmount: totalAmount,
        status: status,
    };
    const options = { returnDocument: "after" };
    const updateOrder = await (0, order_service_1.updateOrder)(orderId, updateOrderData, options);
    res.status(200).send({
        success: true,
        data: updateOrder
    });
};
exports.updateOrder = updateOrder;
