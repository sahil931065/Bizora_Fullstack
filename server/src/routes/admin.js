import { Router } from "express";
import mongoose from "mongoose";
import Business from "../models/Business.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth, requireRole("admin"));
router.get("/businesses/pending", async (_req, res, next) => {
  try { const items = await Business.find({ status: "pending" }).sort({ createdAt: 1 }); return res.json({ items: items.map((item) => ({ ...item.toObject(), id: item.id, sellerId: String(item.sellerId) })) }); } catch (error) { return next(error); }
});
router.patch("/businesses/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Business not found." });
    const { action } = req.body || {}; if (!["approve", "reject"].includes(action)) return res.status(400).json({ message: "Choose approve or reject." });
    const item = await Business.findOneAndUpdate({ _id: req.params.id, status: "pending" }, { $set: { status: action === "approve" ? "published" : "rejected", verified: action === "approve" } }, { new: true });
    return item ? res.json({ item: { ...item.toObject(), id: item.id, sellerId: String(item.sellerId) } }) : res.status(404).json({ message: "Pending listing not found." });
  } catch (error) { return next(error); }
});
export default router;
