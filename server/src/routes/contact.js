import { Router } from "express";
import rateLimit from "express-rate-limit";
import ContactMessage from "../models/ContactMessage.js";

const router = Router();
router.post("/", rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false }), async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body || {};
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) return res.status(400).json({ message: "Enter your name." });
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return res.status(400).json({ message: "Enter a valid email address." });
    if (typeof subject !== "string" || !subject.trim()) return res.status(400).json({ message: "Choose a subject." });
    if (typeof message !== "string" || message.trim().length < 20 || message.trim().length > 3000) return res.status(400).json({ message: "Write a message between 20 and 3000 characters." });
    await ContactMessage.create({ name: name.trim(), email: email.trim().toLowerCase(), subject: subject.trim(), message: message.trim() });
    return res.status(201).json({ message: "Your message has been received." });
  } catch (error) { return next(error); }
});

export default router;
