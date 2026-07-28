import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from "../controllers/message.controllers.js";
import { arcjetProtection } from "../middleware/arcject.middleware.js";

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;