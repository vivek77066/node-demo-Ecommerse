"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    const url = process.env.MONGO_URL;
    mongoose_1.default.connect(url).then(() => {
        console.log("mongodb connected");
    }).catch((error) => {
        console.log(`database connection error${error}`);
    });
};
exports.default = connectDB;
