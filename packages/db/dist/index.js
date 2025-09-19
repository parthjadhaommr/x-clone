"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.Notification = exports.Comment = exports.Post = exports.User = void 0;
// Re-export models
var user_model_1 = require("./models/user.model");
__createBinding(exports, user_model_1, "default", "User");
var post_model_1 = require("./models/post.model");
__createBinding(exports, post_model_1, "default", "Post");
var comment_model_1 = require("./models/comment.model");
__createBinding(exports, comment_model_1, "default", "Comment");
var notification_model_1 = require("./models/notification.model");
__createBinding(exports, notification_model_1, "default", "Notification");
