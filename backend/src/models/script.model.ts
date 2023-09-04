import mongoose from "mongoose";

const ScriptSchema = new mongoose.Schema({
  scriptUrl: {
    type: String,
    unique: true,
  },
  title: String, // Add a title field to store the script's title

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

export const Script = mongoose.model("Script", ScriptSchema);
