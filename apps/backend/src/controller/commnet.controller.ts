import { getAuth } from "@clerk/express"
import { Comment, Post, User } from "@xexpo/db"
import asyncHandler from "express-async-handler"


export const getComments = asyncHandler(
    async (req, res) => {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId })
            .sort({ createAt: -1 })
            .populate("user", "username firstName lastName profilePicture")

        res.status(200).json({ comments })
        return
    }
)

export const createComment = asyncHandler(
    async (req, res) => {
        const { userId } = getAuth(req)
        const { postId } = req.params
        const { content } = req.body

        if (!content || content.trim() === "") {
            res.status(400).json({ error: "Comment content is required" })
            return
        }

        const user = await User.findOne({ clerkId: userId });
        const post = await Post.findById(postId);

        if (!user || !post) {
            res.status(404).json({ error: "user or post not found" })
            return
        }

        const comment = await Comment.create({
            user: user._id,
            post: postId,
            content
        })

        await Post.findByIdAndUpdate(postId, {
            $push: { comments: comment._id }
        })

        res.status(201).json({ comment: comment })
    }
)

export const deleteComment = asyncHandler(
    async (req, res) => {
        const { userId } = getAuth(req)
        const { commentId } = req.params

        const user = await User.findOne({ clerkId: userId })
        const comment = await Comment.findById(commentId)

        if (!user || !comment) {
            res.status(404).json({ error: "User or comment not found" });
            return
        }

        if (comment?.user.toString() !== user?._id.toString()) {
            res.status(403).json({ error: "You can only delete your own comments" })
            return
        }

        const deleteComment = await Comment.findByIdAndDelete(commentId)

        if (deleteComment) {
            await Post.findByIdAndUpdate(comment.post, {
                $pull: { comments: commentId }
            })
        }

        res.status(200).json({ message: "Comment deleted successfully" })
    }
)