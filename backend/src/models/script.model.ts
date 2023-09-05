import mongoose from "mongoose";

const ScriptSchema = new mongoose.Schema({
  scriptUrl: {
    type: String,
    // unique: true,
  },
  title: String, // Add a title field to store the script's title

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  userUid: {
    type: String,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

export const Script = mongoose.model("Script", ScriptSchema);
