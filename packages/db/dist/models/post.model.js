"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.postSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.postSchema = new mongoose_1["default"].Schema({
    user: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        maxLength: 280
    },
    image: {
        type: String,
        "default": ""
    },
    likes: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    comments: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
}, { timestamps: true });
var Post = mongoose_1["default"].model("Post", exports.postSchema);
exports["default"] = Post;
