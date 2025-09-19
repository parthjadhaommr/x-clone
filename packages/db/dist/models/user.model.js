"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.userSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1["default"].Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        "default": ""
    },
    bannerImage: {
        type: String,
        "default": "",
        maxLength: 160
    },
    location: {
        type: String,
        "default": ""
    },
    followers: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    following: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true });
var User = mongoose_1["default"].model("User", exports.userSchema);
exports["default"] = User;
