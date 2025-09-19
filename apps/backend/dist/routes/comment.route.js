"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_middleware_1 = require("../middleware/auth.middleware");
var commnet_controller_1 = require("../controller/commnet.controller");
var router = express_1.default.Router();
// public routes
router.get("/post/:postId", commnet_controller_1.getComments);
// protected routes
router.post("/post/:postId", auth_middleware_1.protectRoute, commnet_controller_1.createComment);
router.delete("/:commentId", auth_middleware_1.protectRoute, commnet_controller_1.deleteComment);
exports.default = router;
