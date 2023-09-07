import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    displayName: {
      //comes from firebase
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
    uid: {
      type: String, // from firebase
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
