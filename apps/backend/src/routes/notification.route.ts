import express, { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { deleteNotification, getNotification } from "../controller/notification.controller";


const router: Router = express.Router();

router.get("/", protectRoute, getNotification)
router.delete("/:notificationId", protectRoute, deleteNotification)

export default router