import { Router } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import Business from "../models/Business.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.get("/me/saved", requireAuth, async (req, res, next) => {
  try { const user = await User.findById(req.user.id).populate({ path: "savedBusinesses", match: { status: "published" } }); return res.json({ items: user.savedBusinesses.map((item) => ({ ...item.toObject(), id: item.id, sellerId: String(item.sellerId) })) }); } catch (error) { return next(error); }
});
router.post("/me/saved/:businessId", requireAuth, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.businessId)) return res.status(404).json({ message: "Business not found." });
    const business = await Business.findOne({ _id: req.params.businessId, status: "published" }); if (!business) return res.status(404).json({ message: "Business not found." });
    await User.updateOne({ _id: req.user.id }, { $addToSet: { savedBusinesses: business.id } });
    const user = await User.findById(req.user.id).populate({ path: "savedBusinesses", match: { status: "published" } });
    return res.json({ items: user.savedBusinesses.map((item) => ({ ...item.toObject(), id: item.id, sellerId: String(item.sellerId) })) });
  } catch (error) { return next(error); }
});
router.delete("/me/saved/:businessId", requireAuth, async (req, res, next) => {
  try {
    await User.updateOne({ _id: req.user.id }, { $pull: { savedBusinesses: req.params.businessId } });
    const user = await User.findById(req.user.id).populate({ path: "savedBusinesses", match: { status: "published" } });
    return res.json({ items: user.savedBusinesses.map((item) => ({ ...item.toObject(), id: item.id, sellerId: String(item.sellerId) })) });
  } catch (error) { return next(error); }
});
export default router;
