import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  senderName: { type: String, required: true, maxlength: 100 },
  body: { type: String, required: true, trim: true, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const inquirySchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true, index: true },
  businessName: { type: String, required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  buyerName: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  sellerName: { type: String, required: true },
  status: { type: String, enum: ["open", "in_review", "closed"], default: "open" },
  messages: { type: [messageSchema], default: [] },
}, { timestamps: true, versionKey: false });

export default mongoose.model("Inquiry", inquirySchema);
