"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.getOrder = exports.deleteOrder = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../model/order.model"));
const createOrder = async (orderData) => {
    return order_model_1.default.create(orderData);
};
exports.createOrder = createOrder;
const deleteOrder = async (orderId) => {
    return order_model_1.default.findByIdAndUpdate(orderId);
};
exports.deleteOrder = deleteOrder;
const getOrder = async () => {
    return order_model_1.default.find();
};
exports.getOrder = getOrder;
const updateOrder = async (orderId, OrderData = {}, options = {}) => {
    return order_model_1.default.findByIdAndUpdate(orderId, OrderData, options);
};
exports.updateOrder = updateOrder;
