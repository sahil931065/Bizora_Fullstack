import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer", required: true },
  savedBusinesses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Business" }],
}, { timestamps: true, versionKey: false });

export default mongoose.model("User", userSchema);
