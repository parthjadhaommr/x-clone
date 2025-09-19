import express, { Router } from "express";
import { createPost, deletePosts, getPost, getPosts, getUserPosts, likePost } from "../controller/post.controller";
import { protectRoute } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const router : Router = express.Router();

// public routes
router.get("/", getPosts)
router.get("/:postId", getPost)
router.get("/user/:username", getUserPosts)

// protected routes
router.post("/", protectRoute, upload.single("image"), createPost)
router.post("/:postId/like", protectRoute, likePost)
router.delete("/:postId", protectRoute, deletePosts)

export default router