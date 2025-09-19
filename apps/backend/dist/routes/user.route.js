"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controller/user.controller");
var auth_middleware_1 = require("../middleware/auth.middleware");
var router = express_1.default.Router();
router.get("/profile/:username", user_controller_1.getUserProfile);
router.post("/me", auth_middleware_1.protectRoute, user_controller_1.getCurrentUser);
router.post("/sync", auth_middleware_1.protectRoute, user_controller_1.syncUser);
router.put("/profile", auth_middleware_1.protectRoute, user_controller_1.updateUserProfile);
router.post("/follow/:targetUserId", auth_middleware_1.protectRoute, user_controller_1.followUser);
exports.default = router;
