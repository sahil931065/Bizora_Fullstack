import { Router } from "express";
import mongoose from "mongoose";
import Business from "../models/Business.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();
const fields = ["name", "category", "country", "price", "revenue", "profit", "age", "customers", "description"];
function validPayload(body) {
  const data = Object.fromEntries(fields.filter((key) => body[key] !== undefined).map((key) => [key, body[key]]));
  if (typeof data.name !== "string" || data.name.trim().length < 2 || data.name.length > 100) return "Business name is required.";
  if (typeof data.description !== "string" || data.description.trim().length < 30 || data.description.length > 1200) return "Write a business overview between 30 and 1,200 characters.";
  if (typeof data.category !== "string" || data.category.length > 60 || typeof data.country !== "string" || data.country.length > 80) return "Add a valid business category and country.";
  for (const key of ["price", "revenue", "profit", "customers"]) if (data[key] !== undefined && (!Number.isFinite(Number(data[key])) || Number(data[key]) < (key === "price" ? 1 : 0))) return `Enter a valid ${key}.`;
  return null;
}
function dto(item) { return { ...item.toObject(), id: item.id, sellerId: String(item.sellerId) }; }

router.get("/mine", requireAuth, requireRole("seller", "admin"), async (req, res, next) => {
  try { const items = await Business.find(req.user.role === "admin" ? {} : { sellerId: req.user.id }).sort({ createdAt: -1 }); return res.json({ items: items.map(dto) }); } catch (error) { return next(error); }
});
router.get("/", async (req, res, next) => {
  try { const items = await Business.find({ status: "published" }).sort({ createdAt: -1 }).limit(100); return res.json({ items: items.map(dto) }); } catch (error) { return next(error); }
});
router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Business not found." });
    const item = await Business.findOne({ _id: req.params.id, status: "published" });
    return item ? res.json({ item: dto(item) }) : res.status(404).json({ message: "Business not found." });
  } catch (error) { return next(error); }
});
router.post("/", requireAuth, requireRole("seller"), async (req, res, next) => {
  try {
    const message = validPayload(req.body || {}); if (message) return res.status(400).json({ message });
    const item = await Business.create({ ...req.body, status: "pending", sellerId: req.user.id, verified: false });
    return res.status(201).json({ item: dto(item) });
  } catch (error) { return next(error); }
});
router.patch("/:id", requireAuth, requireRole("seller", "admin"), async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Business not found." });
    const current = await Business.findById(req.params.id);
    if (!current) return res.status(404).json({ message: "Business not found." });
    if (req.user.role !== "admin" && String(current.sellerId) !== req.user.id) return res.status(403).json({ message: "You can only edit your own listing." });
    const allowed = Object.fromEntries(fields.filter((key) => req.body?.[key] !== undefined).map((key) => [key, req.body[key]]));
    const message = validPayload({ ...current.toObject(), ...allowed }); if (message) return res.status(400).json({ message });
    Object.assign(current, allowed); if (req.user.role !== "admin") current.status = "pending"; await current.save();
    return res.json({ item: dto(current) });
  } catch (error) { return next(error); }
});
export default router;
