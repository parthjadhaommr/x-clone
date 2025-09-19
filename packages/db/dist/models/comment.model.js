"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.commentSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.commentSchema = new mongoose_1["default"].Schema({
    user: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    content: {
        type: String,
        required: true,
        maxLength: 280
    },
    likes: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, {
    timestamps: true
});
var Comment = mongoose_1["default"].model("Comment", exports.commentSchema);
exports["default"] = Comment;
