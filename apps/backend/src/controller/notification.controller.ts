import { getAuth } from "@clerk/express"
import { Notification, User } from "@xexpo/db"
import asyncHandler from "express-async-handler"
import { Request, Response } from "express";
import { error } from "console";

export const getNotification = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = getAuth(req)

        const user = await User.findOne({ clerkId: userId })
        if (!user) {
            res.status(404).json({ error: "user not found" })
            return
        }

        const notification = await Notification.find({ to: user._id })
            .sort({ createdAt: -1 })
            .populate("from", "username firstName lastName profilerPicture")
            .populate("post", "content image")
            .populate("comment", "content")

        res.status(200).json({ notification })
        return
    }
)
export const deleteNotification = asyncHandler(
    async (req, res) => {
        const { userId } = getAuth(req)
        const { notificationId } = req.params

        const user = await User.findOne({ clerkId: userId })
        if (!user) {
            res.status(404).json({ error: "User not found" })
            return
        }

        const notification = await Notification.findOneAndDelete({
            _id: notificationId,
            to: user._id
        })

        if (!notification) {
            res.status(404).json({ error: "Notification not found" })
            return
        }

        res.status(200).json({ message: "Notification deleted successfully" })
        return
    }
)