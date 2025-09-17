import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { createComment, deleteComment, getComments } from "../controller/commnet.controller";

const router = express.Router();


// public routes
router.get("/post/:postId", getComments)

// protected routes
router.post("/post/:postId", protectRoute, createComment)
router.delete("/:commentId", protectRoute, deleteComment)

export default router