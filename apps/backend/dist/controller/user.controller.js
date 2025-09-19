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
exports.followUser = exports.getCurrentUser = exports.syncUser = exports.updateUserProfile = exports.getUserProfile = void 0;
var db_1 = require("@parth-jadhao/db");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var express_1 = require("@clerk/express");
exports.getUserProfile = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user;
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
                res.status(200).json({ user: user });
                return [2 /*return*/];
        }
    });
}); });
exports.updateUserProfile = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, allowedFields, updates, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = (0, express_1.getAuth)(req).userId;
                allowedFields = ['firstName', 'lastName', 'bio', 'profilePicture'];
                updates = Object.keys(req.body)
                    .filter(function (key) { return allowedFields.includes(key); })
                    .reduce(function (obj, key) {
                    obj[key] = req.body[key];
                    return obj;
                }, {});
                return [4 /*yield*/, db_1.User.findOneAndUpdate({ clerkId: userId }, updates, { new: true })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return [2 /*return*/];
                }
                res.json(user);
                return [2 /*return*/];
        }
    });
}); });
exports.syncUser = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, existingUser, clerkUser, userData, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = (0, express_1.getAuth)(req).userId;
                if (!userId) {
                    res.status(400).json({ message: "invalid request" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.User.findOne({ clerkId: userId })];
            case 1:
                existingUser = _a.sent();
                if (existingUser) {
                    res.status(200).json({ user: existingUser, message: "User already exists" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, express_1.clerkClient.users.getUser(userId)];
            case 2:
                clerkUser = _a.sent();
                userData = {
                    clerkId: userId,
                    email: clerkUser.emailAddresses[0].emailAddress,
                    firstName: clerkUser.firstName || "",
                    lastName: clerkUser.lastName || "",
                    username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
                    profilePicture: clerkUser.imageUrl || "",
                };
                return [4 /*yield*/, db_1.User.create(userData)];
            case 3:
                user = _a.sent();
                res.status(201).json({ user: user, message: "User created successfully" });
                return [2 /*return*/];
        }
    });
}); });
exports.getCurrentUser = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = (0, express_1.getAuth)(req).userId;
                return [4 /*yield*/, db_1.User.findOne({ clerkId: userId })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return [2 /*return*/];
                }
                res.status(200).json({ user: user });
                return [2 /*return*/];
        }
    });
}); });
exports.followUser = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, targetUserId, currentUser, targetUser, isFollowing;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = (0, express_1.getAuth)(req).userId;
                targetUserId = req.params.targetUserId;
                if (userId === targetUserId) {
                    res.status(400).json({ error: "You cannot follow yourself" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.User.findOne({ clerkId: userId })];
            case 1:
                currentUser = _a.sent();
                return [4 /*yield*/, db_1.User.findById(targetUserId)];
            case 2:
                targetUser = _a.sent();
                if (!currentUser || !targetUser) {
                    res.status(404).json({ error: "User not found" });
                    return [2 /*return*/];
                }
                isFollowing = currentUser === null || currentUser === void 0 ? void 0 : currentUser.following.map(function (id) { return id.toString(); }).includes(targetUserId);
                if (!isFollowing) return [3 /*break*/, 5];
                // unfollow
                return [4 /*yield*/, db_1.User.findByIdAndUpdate(currentUser === null || currentUser === void 0 ? void 0 : currentUser._id, {
                        $pull: { following: targetUserId }
                    })];
            case 3:
                // unfollow
                _a.sent();
                return [4 /*yield*/, db_1.User.findByIdAndUpdate(targetUserId, {
                        $pull: { followers: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id }
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 9];
            case 5: 
            // follow
            return [4 /*yield*/, db_1.User.findByIdAndUpdate(currentUser === null || currentUser === void 0 ? void 0 : currentUser._id, {
                    $push: { following: targetUserId }
                })];
            case 6:
                // follow
                _a.sent();
                return [4 /*yield*/, db_1.User.findByIdAndUpdate(targetUserId, {
                        $push: { followers: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id }
                    })];
            case 7:
                _a.sent();
                return [4 /*yield*/, db_1.Notification.create({
                        from: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id,
                        to: targetUserId,
                        type: "follow"
                    })];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9:
                res.status(200).json({
                    message: isFollowing ? "User unfollowed successfully" : "User followed successfully",
                });
                return [2 /*return*/];
        }
    });
}); });
