import mongoose from "mongoose";

const paymentStatusOptions = ["PENDING", "SUCCESS", "FAILED"];

const ScriptsSchema = new mongoose.Schema({
  pdfUrl: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: paymentStatusOptions, // Use the enum validator to restrict values to the allowed options
    default: "PENDING",
  },
});

export const Script = mongoose.model("Script", ScriptsSchema);
