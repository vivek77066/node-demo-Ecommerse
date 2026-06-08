"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.deleteUser = exports.updateUser = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const getUsers = async () => {
    return user_model_1.default.find();
};
exports.getUsers = getUsers;
const updateUser = async (userId, projection = {}, options = { new: true }) => {
    console.log("projection", projection);
    return user_model_1.default.findByIdAndUpdate(userId, projection, options);
};
exports.updateUser = updateUser;
const deleteUser = async (userId) => {
    return user_model_1.default.findByIdAndDelete(userId);
};
exports.deleteUser = deleteUser;
const findUser = async (filter = {}) => {
    return user_model_1.default.findOne(filter).select("+password");
};
exports.findUser = findUser;
