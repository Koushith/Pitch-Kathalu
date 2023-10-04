//@ts-nocheck
import mongoose from 'mongoose'

const ScriptSchema = new mongoose.Schema({
  scriptUrl: {
    type: String,
    // unique: true,
  },
  logline: {
    type: String,
  },
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

// Virtual field to calculate the week number of creation
ScriptSchema.virtual('weekNumber').get(function () {
  const currentDate = this.uploadDate
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  const startOfWeek = new Date(currentYear, currentMonth, currentDay)
  startOfWeek.setDate(currentDay - currentDate.getDay()) // Adjust for the start of the week

  const endOfWeek = new Date(currentYear, currentMonth, currentDay)
  endOfWeek.setDate(currentDay + (6 - currentDate.getDay())) // Adjust for the end of the week

  // Convert the dates to UTC to ensure consistent comparison
  const startOfWeekUTC = new Date(
    Date.UTC(currentYear, currentMonth, startOfWeek.getUTCDate())
  )
  const endOfWeekUTC = new Date(
    Date.UTC(currentYear, currentMonth, endOfWeek.getUTCDate())
  )

  return {
    startOfWeek: startOfWeekUTC,
    endOfWeek: endOfWeekUTC,
  }
})

const LikedScriptSchema = new mongoose.Schema({
  script: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Script',
  },
})

export const LikedScript = mongoose.model('LikedScript', LikedScriptSchema)
export const Script = mongoose.model('Script', ScriptSchema)
