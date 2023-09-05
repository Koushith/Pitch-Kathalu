import mongoose from "mongoose";

const paymentStatusOptions = ["PENDING", "SUCCESS", "FAILED"];

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // update this value in success page.
  script: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Script",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: paymentStatusOptions,
    default: "PENDING",
  },
  paymentReference: {
    type: String,
    unique: true,
  },
});

export const Payment = mongoose.model("Payment", PaymentSchema);
