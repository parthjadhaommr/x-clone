"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var post_controller_1 = require("../controller/post.controller");
var auth_middleware_1 = require("../middleware/auth.middleware");
var upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
var router = express_1.default.Router();
// public routes
router.get("/", post_controller_1.getPosts);
router.get("/:postId", post_controller_1.getPost);
router.get("/user/:username", post_controller_1.getUserPosts);
// protected routes
router.post("/", auth_middleware_1.protectRoute, upload_middleware_1.default.single("image"), post_controller_1.createPost);
router.post("/:postId/like", auth_middleware_1.protectRoute, post_controller_1.likePost);
router.delete("/:postId", auth_middleware_1.protectRoute, post_controller_1.deletePosts);
exports.default = router;
