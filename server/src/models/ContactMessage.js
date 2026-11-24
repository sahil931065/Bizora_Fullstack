import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  subject: { type: String, required: true, trim: true, maxlength: 100 },
  message: { type: String, required: true, trim: true, minlength: 20, maxlength: 3000 },
}, { timestamps: true, versionKey: false });

export default mongoose.model("ContactMessage", contactMessageSchema);
