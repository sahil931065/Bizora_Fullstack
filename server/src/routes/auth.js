import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import process from "node:process";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
function issueToken(user) { return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h", issuer: "bizora-api", audience: "bizora-web" }); }
function publicUser(user) { return { id: user.id, name: user.name, email: user.email, role: user.role }; }

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body || {};
    if (typeof name !== "string" || name.trim().length < 2 || name.length > 100) return res.status(400).json({ message: "Enter a name between 2 and 100 characters." });
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: "Enter a valid email address." });
    if (typeof password !== "string" || password.length < 10 || password.length > 128) return res.status(400).json({ message: "Password must be between 10 and 128 characters." });
    if (!['buyer', 'seller'].includes(role)) return res.status(400).json({ message: "Choose a buyer or seller account." });
    const existing = await User.exists({ email: email.toLowerCase().trim() });
    if (existing) return res.status(409).json({ message: "An account with this email already exists." });
    const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), passwordHash: await bcrypt.hash(password, 12), role });
    return res.status(201).json({ token: issueToken(user), user: publicUser(user) });
  } catch (error) { return next(error); }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email: String(email || "").toLowerCase().trim() }).select("+passwordHash");
    if (!user || typeof password !== "string" || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ message: "Email or password is incorrect." });
    return res.json({ token: issueToken(user), user: publicUser(user) });
  } catch (error) { return next(error); }
});

router.get("/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));
export default router;
