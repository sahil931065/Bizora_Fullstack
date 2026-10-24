import "dotenv/config";
import process from "node:process";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js";
import businessRoutes from "./routes/businesses.js";
import userRoutes from "./routes/users.js";
import inquiryRoutes from "./routes/inquiries.js";
import adminRoutes from "./routes/admin.js";

const required = ["MONGODB_URI", "JWT_SECRET"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) { console.error(`Missing required environment values: ${missing.join(", ")}. Copy .env.example to .env and configure them.`); process.exit(1); }
if (process.env.JWT_SECRET.length < 32) { console.error("JWT_SECRET must contain at least 32 characters."); process.exit(1); }

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",").map((item) => item.trim()), credentials: false }));
app.use(express.json({ limit: "1mb" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: "draft-8", legacyHeaders: false }), authRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/admin", adminRoutes);
app.use((_req, res) => res.status(404).json({ message: "Endpoint not found." }));
app.use((error, _req, res, _next) => {
  void _next;
  if (error?.code === 11000) return res.status(409).json({ message: "That value is already in use." });
  console.error(error);
  return res.status(500).json({ message: "Something went wrong. Please try again." });
});

const port = Number(process.env.PORT || 4000);
try {
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  app.listen(port, () => console.log(`Bizora API listening on port ${port}`));
} catch (error) {
  console.error("Could not connect to MongoDB:", error.message);
  process.exit(1);
}
