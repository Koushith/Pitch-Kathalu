import mongoose from "mongoose";

const ScriptsSchema = new mongoose.Schema({
  scriptUrl: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Script = mongoose.model("Script", ScriptsSchema);
