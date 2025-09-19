"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.notificationSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.notificationSchema = new mongoose_1["default"].Schema({
    from: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        "enum": ["follow", "like", "comment"]
    },
    post: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "Post",
        "default": null
    },
    comment: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "Comment",
        "default": null
    }
}, {
    timestamps: true
});
// Add custom validation for notification type consistency
exports.notificationSchema.pre('save', function () {
    if (this.type === 'follow') {
        if (this.post || this.comment) {
            throw new Error('Follow notifications should not have post or comment references');
        }
    }
    else if (this.type === 'like' || this.type === 'comment') {
        if (!this.post) {
            throw new Error("".concat(this.type, " notifications must reference a post"));
        }
        if (this.type === 'comment' && !this.comment) {
            throw new Error('Comment notifications must reference a comment');
        }
    }
});
var Notification = mongoose_1["default"].model("Notification", exports.notificationSchema);
exports["default"] = Notification;
