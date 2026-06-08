"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const addressSchema = new mongoose_1.default.Schema({
    city: {
        type: String,
        required: true
    },
    dist: {
        type: String
    },
    pincode: {
        type: Number
    }
}, {
    _id: false,
});
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    address: addressSchema
}, {
    timestamps: true
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return;
    }
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        this.password = await bcrypt_1.default.hash(this.password, salt);
    }
    catch (error) {
        console.log(`something went wrong${error}`);
    }
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
