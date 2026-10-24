import jwt from "jsonwebtoken";
import process from "node:process";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : "";
  if (!token) return res.status(401).json({ message: "Sign in to continue." });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { issuer: "bizora-api", audience: "bizora-web" });
    const user = await User.findById(payload.sub).select("name email role");
    if (!user) return res.status(401).json({ message: "This account is no longer available." });
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: "Your session has expired. Sign in again." });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ message: "You do not have permission to do that." });
}
