import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  category: { type: String, required: true, trim: true, maxlength: 60 },
  country: { type: String, required: true, trim: true, maxlength: 80 },
  price: { type: Number, required: true, min: 1 },
  revenue: { type: Number, required: true, min: 0 },
  profit: { type: Number, required: true, min: 0 },
  age: { type: String, trim: true, maxlength: 40, default: "Not provided" },
  customers: { type: Number, min: 0, default: 0 },
  description: { type: String, required: true, trim: true, minlength: 30, maxlength: 1200 },
  initials: { type: String, maxlength: 2 },
  visual: { type: String, default: "software" },
  status: { type: String, enum: ["pending", "published", "rejected"], default: "pending", index: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  verified: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

export default mongoose.model("Business", businessSchema);
