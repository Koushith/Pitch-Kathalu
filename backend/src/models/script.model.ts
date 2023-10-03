import mongoose from 'mongoose'

const ScriptSchema = new mongoose.Schema({
  scriptUrl: {
    type: String,
    // unique: true,
  },
  logline: {
    type: String,
  }, // Add a title field to store the script's title
  synopsis: {
    type: String,
  },
  personalConnect: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  phoneNumber: {
    type: String,
    require: true,
  },
})

const LikedScriptSchema = new mongoose.Schema({
  script: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Script',
  },
})

export const LikedScript = mongoose.model('LikedScript', LikedScriptSchema)
export const Script = mongoose.model('Script', ScriptSchema)
