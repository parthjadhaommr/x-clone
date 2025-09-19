
import { Notification, User } from "@xexpo/db";

import asyncHandler from "express-async-handler";
import { Request, RequestHandler, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";

export const getUserProfile: RequestHandler = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json({ user });
        return
    }
);

export const updateUserProfile: RequestHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = getAuth(req)


        // Define allowed fields for update
        const allowedFields = ['firstName', 'lastName', 'bio', 'profilePicture'];
        const updates = Object.keys(req.body)
            .filter(key => allowedFields.includes(key))
            .reduce((obj: any, key) => {
                obj[key] = req.body[key];
                return obj;
            }, {});

        const user = await User.findOneAndUpdate(
            { clerkId: userId },
            updates,
            { new: true }
        )

        if (!user) {
            res.status(404).json({ error: "User not found" })
            return
        }

        res.json(user)
        return
    }
)

export const syncUser: RequestHandler = asyncHandler(
    async (req, res) => {
        const { userId } = getAuth(req)
        if (!userId) {
            res.status(400).json({ message: "invalid request" })
            return
        }
        const existingUser = await User.findOne({ clerkId: userId })
        if (existingUser) {
            res.status(200).json({ user: existingUser, message: "User already exists" })
            return
        }
        const clerkUser = await clerkClient.users.getUser(userId)
        const userData = {
            clerkId: userId,
            email: clerkUser.emailAddresses[0].emailAddress,
            firstName: clerkUser.firstName || "",
            lastName: clerkUser.lastName || "",
            username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
            profilePicture: clerkUser.imageUrl || "",
        }

        const user = await User.create(userData)

        res.status(201).json({ user, message: "User created successfully" })
        return
    }
)

export const getCurrentUser: RequestHandler = asyncHandler(
    async (req, res) => {
        const { userId } = getAuth(req)
        const user = await User.findOne({ clerkId: userId })

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return
        }

        res.status(200).json({ user });
        return
    }
)

export const followUser: RequestHandler = asyncHandler(
    async (req, res) => {
        const { userId } = getAuth(req);
        const { targetUserId } = req.params;

        if (userId === targetUserId) {
            res.status(400).json({ error: "You cannot follow yourself" })
            return
        }

        const currentUser = await User.findOne({ clerkId: userId });
        const targetUser = await User.findById(targetUserId);
        if (!currentUser || !targetUser) {
            res.status(404).json({ error: "User not found" })
            return
        }

        const isFollowing = currentUser?.following.map(id => id.toString()).includes(targetUserId);

        if (isFollowing) {
            // unfollow
            await User.findByIdAndUpdate(currentUser?._id, {
                $pull: { following: targetUserId }
            })
            await User.findByIdAndUpdate(targetUserId, {
                $pull: { followers: currentUser?._id }
            })
        } else {
            // follow
            await User.findByIdAndUpdate(currentUser?._id, {
                $push: { following: targetUserId }
            })
            await User.findByIdAndUpdate(targetUserId, {
                $push: { followers: currentUser?._id }
            })

            await Notification.create({
                from: currentUser?._id,
                to: targetUserId,
                type: "follow"
            })
        }

        res.status(200).json({
            message: isFollowing ? "User unfollowed successfully" : "User followed successfully",
        })

    }
)