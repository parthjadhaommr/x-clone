"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePosts = exports.likePost = exports.createPost = exports.getUserPosts = exports.getPost = exports.getPosts = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var db_1 = require("@parth-jadhao/db");
var express_1 = require("@clerk/express");
var cloudinary_1 = __importDefault(require("../config/cloudinary"));
exports.getPosts = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.Post.find()
                    .sort({ createdAt: -1 })
                    .populate("user", "username firstname lastName profilePicture")
                    .populate({
                    path: "comments",
                    populate: {
                        path: "user",
                        select: "username firstName lastName profilePicture"
                    },
                })];
            case 1:
                posts = _a.sent();
                res.status(200).json({ posts: posts });
                return [2 /*return*/];
        }
    });
}); });
exports.getPost = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                return [4 /*yield*/, db_1.Post.findById(postId)
                        .populate("user", "username firstName lastName profilePicture")
                        .populate({
                        path: "comments",
                        populate: {
                            path: "user",
                            select: "username firstName lastName profilePicture"
                        }
                    })];
            case 1:
                post = _a.sent();
                if (!post) {
                    res.status(404).json({ error: "Post not found" });
                    return [2 /*return*/];
                }
                res.status(200).json({ post: post });
                return [2 /*return*/];
        }
    });
}); });
exports.getUserPosts = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                return [4 /*yield*/, db_1.User.findOne({ username: username })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.Post.find({ user: user._id })
                        .sort({ createdAt: -1 })
                        .populate("user", "username firstName lastName profilePicture")
                        .populate({
                        path: "comments",
                        populate: {
                            path: "user",
                            select: "username firstName lastName profilePicture"
                        }
                    })];
            case 2:
                posts = _a.sent();
                res.status(200).json({ posts: posts });
                return [2 /*return*/];
        }
    });
}); });
exports.createPost = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, content, imageFile, user, imageUrl, base64Image, uploadResponse, uploadError_1, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = (0, express_1.getAuth)(req).userId;
                content = req.body.content;
                imageFile = req.file;
                if (!content && !imageFile) {
                    res.status(400).json({ error: "Post must contain either text or image" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.User.findOne({ clerkId: userId })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return [2 /*return*/];
                }
                imageUrl = "";
                if (!imageFile) return [3 /*break*/, 5];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                base64Image = "data:".concat(imageFile.mimetype, ";base64,").concat(imageFile.buffer.toString("base64"));
                return [4 /*yield*/, cloudinary_1.default.uploader.upload(base64Image, {
                        folder: "social_media_posts",
                        resource_type: "image",
                        transformation: [
                            { width: 800, height: 600, crop: "limit" },
                            { quality: "auto" },
                            { format: "auto" }
                        ],
                    })];
            case 3:
                uploadResponse = _a.sent();
                imageUrl = uploadResponse.secure_url;
                return [3 /*break*/, 5];
            case 4:
                uploadError_1 = _a.sent();
                console.error("Cloudinary upload error : ", uploadError_1);
                res.status(400).json({ error: "Failed to upload image" });
                return [2 /*return*/];
            case 5: return [4 /*yield*/, db_1.Post.create({
                    user: user._id,
                    content: content || "",
                    image: imageUrl
                })];
            case 6:
                post = _a.sent();
                res.status(201).json({ post: post });
                return [2 /*return*/];
        }
    });
}); });
exports.likePost = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, postId, user, post, isLiked;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = (0, express_1.getAuth)(req).userId;
                postId = req.params.postId;
                return [4 /*yield*/, db_1.User.findOne({ clerkId: userId })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, db_1.Post.findById(postId)];
            case 2:
                post = _a.sent();
                if (!user || !post) {
                    res.status(404).json({ error: "User or post not found" });
                    return [2 /*return*/];
                }
                isLiked = post.likes.some(function (id) { return id.toString() === user._id.toString(); });
                if (!isLiked) return [3 /*break*/, 4];
                return [4 /*yield*/, db_1.Post.findByIdAndUpdate(postId, {
                        $pull: { likes: user._id }
                    })];
            case 3:
                _a.sent();
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, db_1.Post.findByIdAndUpdate(postId, {
                    $push: { likes: user._id }
                })];
            case 5:
                _a.sent();
                if (!(post.user.toString() != user._id.toString())) return [3 /*break*/, 7];
                return [4 /*yield*/, db_1.Notification.create({
                        from: user._id,
                        to: post.user,
                        types: "like",
                        post: postId,
                    })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                res.status(200).json({
                    message: isLiked ? "Post unliked successfully " : "Post liked successfully"
                });
                return [2 /*return*/];
        }
    });
}); });
exports.deletePosts = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, postId, user, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = (0, express_1.getAuth)(req).userId;
                postId = req.params.postId;
                return [4 /*yield*/, db_1.User.findOne({ clerkId: userId })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, db_1.Post.findOne({ _id: postId })];
            case 2:
                post = _a.sent();
                if (!user || !post) {
                    res.status(404).json({
                        error: "User or post not found"
                    });
                    return [2 /*return*/];
                }
                if ((post === null || post === void 0 ? void 0 : post.user.toString()) !== (user === null || user === void 0 ? void 0 : user._id.toString())) {
                    res.status(403).json({ error: "You can only delete you own post" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.Post.findByIdAndDelete(postId)];
            case 3:
                _a.sent();
                return [4 /*yield*/, db_1.Comment.deleteMany({ post: postId })];
            case 4:
                _a.sent();
                res.status(200).json({ message: "Post deleted successfully" });
                return [2 /*return*/];
        }
    });
}); });
