import express, { Router } from "express";
import { followUser, getCurrentUser, getUserProfile, syncUser, updateUserProfile } from "../controller/user.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router: Router = express.Router()

router.get("/profile/:username", getUserProfile)

router.get("/me", protectRoute, getCurrentUser)
router.post("/sync", protectRoute, syncUser)
router.put("/profile", protectRoute, updateUserProfile)
router.post("/follow/:targetUserId", protectRoute, followUser)

export default router