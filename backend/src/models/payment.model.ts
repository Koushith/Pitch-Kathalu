import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  script: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Script",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export const Payment = mongoose.model("Payment", PaymentSchema);
