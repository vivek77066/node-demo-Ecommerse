"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = exports.changePassword = exports.register = exports.login = void 0;
const auth_service_1 = require("../service/auth.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../service/user.service");
const jwt_1 = require("../utils/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../model/user.model"));
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const filter = {
        email: email,
    };
    const user = await (0, user_service_1.findUser)(filter);
    if (!user) {
        res.status(500).send({
            success: false,
            message: "user not fount",
        });
        return;
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(500).send({
            success: false,
            message: "something went wrong",
        });
        return;
    }
    const accesstoken = (0, jwt_1.generateAccessToken)(user);
    const refreshtoken = (0, jwt_1.generateRefreshToken)(user);
    res.status(200).send({
        success: true,
        data: user,
        accesstoken: accesstoken,
        refreshtoken: refreshtoken,
    });
};
exports.login = login;
const register = async (req, res) => {
    const data = req.body;
    const filter = { email: data.email };
    const alreadyUser = await (0, user_service_1.findUser)(filter);
    if (alreadyUser) {
        res.status(500).send({
            success: false,
            message: "email already Present",
        });
        return;
    }
    const user = await (0, auth_service_1.register)(data);
    res.status(201).send({
        success: true,
        data: user,
        message: "User create successfully",
    });
};
exports.register = register;
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.params.userId;
    const user = await (0, auth_service_1.findUserByIdService)(userId);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found",
        });
        return;
    }
    const isMatch = await bcrypt_1.default.compare(oldPassword, user.password);
    if (!isMatch) {
        res.status(400).json({
            success: false,
            message: "Old password is incorrect",
        });
        return;
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Password changed successfully",
    });
};
exports.changePassword = changePassword;
const refreshTokenController = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(401).json({
            success: false,
            message: "Refresh token required",
        });
        return;
    }
    const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRATE);
    const user = await user_model_1.default.findById(decoded._id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found",
        });
        return;
    }
    const accessToken = (0, jwt_1.generateAccessToken)(user);
    res.status(200).json({
        success: true,
        accessToken,
    });
};
exports.refreshTokenController = refreshTokenController;
