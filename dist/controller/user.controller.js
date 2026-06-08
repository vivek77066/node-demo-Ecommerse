"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceUser = exports.updateUser = exports.deleteUser = exports.getUsers = void 0;
const auth_service_1 = require("../service/auth.service");
const user_service_1 = require("../service/user.service");
const getUsers = async (req, res) => {
    const users = await (0, user_service_1.getUsers)();
    res.status(200).send({
        success: true,
        data: users,
    });
};
exports.getUsers = getUsers;
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const deleteUser = await (0, user_service_1.deleteUser)(userId);
    res.status(200).send({
        success: true,
        data: deleteUser,
    });
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, age, phone, address } = req.body;
    const updatedData = { name: name, email: email, age: age, phone: phone, address: address };
    const newUser = await (0, user_service_1.updateUser)(userId, updatedData);
    res.status(200).send({
        success: true,
        data: newUser,
    });
};
exports.updateUser = updateUser;
const replaceUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, age, phone, address } = req.body;
    const user = await (0, auth_service_1.findUserByIdService)(userId);
    if (!user) {
        res.status(404).send({
            success: false,
            message: "User not found",
        });
        return;
    }
    user.name = name;
    user.email = email;
    user.age = age;
    user.phone = phone;
    user.address = address;
    await user.save();
    res.status(200).send({
        success: true,
        data: user,
    });
};
exports.replaceUser = replaceUser;
