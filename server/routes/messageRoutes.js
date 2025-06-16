import express from "express";
import {
  getMessages,
  sendMessage,
  markMessagesAsRead,
  getUnreadCount,
} from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.put("/read/:id", protectRoute, markMessagesAsRead);
router.get("/unread/count", protectRoute, getUnreadCount);

export default router;
