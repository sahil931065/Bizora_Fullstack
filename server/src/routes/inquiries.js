import { Router } from "express";
import mongoose from "mongoose";
import Business from "../models/Business.js";
import Inquiry from "../models/Inquiry.js";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
function dto(item) {
  const value = item.toObject();
  return { ...value, id: item.id, businessId: String(item.businessId), buyerId: String(item.buyerId), sellerId: String(item.sellerId), messages: value.messages.map((message) => ({ ...message, senderId: String(message.senderId), id: String(message._id || message.createdAt) })) };
}
function participant(item, userId) { return String(item.buyerId) === userId || String(item.sellerId) === userId; }

router.get("/", requireAuth, async (req, res, next) => {
  try { const items = await Inquiry.find({ $or: [{ buyerId: req.user.id }, { sellerId: req.user.id }] }).sort({ updatedAt: -1 }); return res.json({ items: items.map(dto) }); } catch (error) { return next(error); }
});
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { businessId, message } = req.body || {};
    if (!mongoose.isValidObjectId(businessId) || typeof message !== "string" || message.trim().length < 10 || message.length > 2000) return res.status(400).json({ message: "Choose a business and write a message between 10 and 2,000 characters." });
    if (req.user.role !== "buyer") return res.status(403).json({ message: "Buyer accounts can contact sellers." });
    const business = await Business.findOne({ _id: businessId, status: "published" }); if (!business) return res.status(404).json({ message: "Business not found." });
    if (String(business.sellerId) === req.user.id) return res.status(400).json({ message: "You cannot contact yourself about your own listing." });
    const seller = await User.findById(business.sellerId).select("name");
    const item = await Inquiry.create({ businessId: business.id, businessName: business.name, buyerId: req.user.id, buyerName: req.user.name, sellerId: business.sellerId, sellerName: seller?.name || "Business seller", messages: [{ senderId: req.user.id, senderName: req.user.name, body: message.trim() }] });
    return res.status(201).json({ item: dto(item) });
  } catch (error) { return next(error); }
});
router.post("/:id/messages", requireAuth, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Conversation not found." });
    const body = req.body?.body;
    if (typeof body !== "string" || body.trim().length < 1 || body.length > 2000) return res.status(400).json({ message: "Message must be between 1 and 2,000 characters." });
    const item = await Inquiry.findById(req.params.id); if (!item || !participant(item, req.user.id)) return res.status(404).json({ message: "Conversation not found." });
    if (item.status === "closed") return res.status(409).json({ message: "This conversation is closed." });
    item.messages.push({ senderId: req.user.id, senderName: req.user.name, body: body.trim() }); await item.save();
    return res.json({ item: dto(item) });
  } catch (error) { return next(error); }
});
router.patch("/:id/status", requireAuth, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Conversation not found." });
    const { status } = req.body || {}; if (!["open", "in_review", "closed"].includes(status)) return res.status(400).json({ message: "Choose a valid conversation status." });
    const item = await Inquiry.findById(req.params.id); if (!item || !participant(item, req.user.id)) return res.status(404).json({ message: "Conversation not found." });
    item.status = status; await item.save(); return res.json({ item: dto(item) });
  } catch (error) { return next(error); }
});
export default router;
