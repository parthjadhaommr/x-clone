"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_middleware_1 = require("../middleware/auth.middleware");
var notification_controller_1 = require("../controller/notification.controller");
var router = express_1.default.Router();
router.get("/", auth_middleware_1.protectRoute, notification_controller_1.getNotification);
router.delete("/:notificationId", auth_middleware_1.protectRoute, notification_controller_1.deleteNotification);
exports.default = router;
