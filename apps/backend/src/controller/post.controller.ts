import asyncHandler from "express-async-handler";
import { Notification, Post, User, Comment } from "@xexpo/db";
import { Request, Response } from "express";
import { error } from "console";
import { getAuth } from "@clerk/express";
import cloudinary from "../config/cloudinary";
import { format } from "path";
import upload from "../middleware/upload.middleware";

export const getPosts = asyncHandler(
    async (req: Request, res: Response) => {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate("user", "username firstname lastName profilePicture")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "username firstName lastName profilePicture"
                },
            });
        res.status(200).json({ posts })
    }
)

export const getPost = asyncHandler(
    async (req: Request, res: Response) => {
        const { postId } = req.params;

        const post = await Post.findById(postId)
            .populate("user", "username firstName lastName profilePicture")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "username firstName lastName profilePicture"
                }
            });
        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }

        res.status(200).json({ post })
    }
)

export const getUserPosts = asyncHandler(
    async (req: Request, res: Response) => {
        const { username } = req.params

        const user = await User.findOne({ username });
        if (!user) {
            res.status(404).json({ error: "User not found" })
            return
        }

        const posts = await Post.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate("user", "username firstName lastName profilePicture")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "username firstName lastName profilePicture"
                }
            });
        res.status(200).json({ posts })
        return
    }
)

export const createPost = asyncHandler(
    async (req, res) => {
        const { userId } = getAuth(req);
        const { content } = req.body;
        const imageFile = req.file;
        if (!content && !imageFile) {
            res.status(400).json({ error: "Post must contain either text or image" })
            return
        }
        const user = await User.findOne({ clerkId: userId })
        if (!user) {
            res.status(404).json({ error: "User not found" })
            return
        }

        let imageUrl = "";

        if (imageFile) {
            try {
                const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
                    "base64"
                )}`

                const uploadResponse = await cloudinary.uploader.upload(base64Image, {
                    folder: "social_media_posts",
                    resource_type: "image",
                    transformation: [
                        { width: 800, height: 600, crop: "limit" },
                        { quality: "auto" },
                        { format: "auto" }
                    ],
                });
                imageUrl = uploadResponse.secure_url
            } catch (uploadError) {
                console.error("Cloudinary upload error : ", uploadError)
                res.status(400).json({ error: "Failed to upload image" })
                return;
            }
        }

        const post = await Post.create({
            user: user._id,
            content: content || "",
            image: imageUrl
        });

        res.status(201).json({ post })
    }
)

export const likePost = asyncHandler(
    async (req, res) => {
        const { userId } = getAuth(req);
        const { postId } = req.params;

        const user = await User.findOne({ clerkId: userId })
        const post = await Post.findById(postId)

        if (!user || !post) {
            res.status(404).json({ error: "User or post not found" });
            return
        }

        const isLiked = post.likes.some(
            (id) => id.toString() === user._id.toString()
        );

        if (isLiked) {
            await Post.findByIdAndUpdate(postId, {
                $pull: { likes: user._id }
            })
        } else {
            await Post.findByIdAndUpdate(postId, {
                $push: { likes: user._id }
            })

            if (post.user.toString() != user._id.toString()) {
                await Notification.create({
                    from: user._id,
                    to: post.user,
                    types: "like",
                    post: postId,
                })
            }
        }
        res.status(200).json({
            message: isLiked ? "Post unliked successfully " : "Post liked successfully"
        })
    }
)

export const deletePosts = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = getAuth(req);
        const { postId } = req.params

        const user = await User.findOne({ clerkId: userId })
        const post = await Post.findOne({ _id: postId })
        if (!user || !post) {
            res.status(404).json({
                error: "User or post not found"
            })
            return;
        }

        if (post?.user.toString() !== user?._id.toString()) {
            res.status(403).json({ error: "You can only delete you own post" })
            return;
        }
        await Post.findByIdAndDelete(postId)
        await Comment.deleteMany({ post: postId });
        res.status(200).json({ message: "Post deleted successfully" })
    }
)