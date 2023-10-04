import { Request, Response } from 'express'
import { startOfWeek, endOfWeek } from 'date-fns'
import { asyncHandler } from '../../middlewares/asyncHandler.js'
import { LikedScript, Script } from '../../models/script.model.js'
import { User } from '../../models/user.model.js'

// Upload Script after logining in and payment is success

// export const uploadScript = async (req: Request, res: Response) => {
//   try {
//     const {
//       synopsis,
//       userUid,
//       userName,
//       logline,
//       personalConnect,
//       email,
//       phoneNumber,
//     } = req.body
//     console.log('request was here- upload script')
//     // console.log({ synopsis, userUid, logline, personalConnect, phoneNumber })

//     // Check if the user with the provided ID exists
//     const user = await User.findOne({ uid: userUid })

//     if (!user) {
//       res.status(400).json({ message: 'User not found' })
//       return
//     }

//     const script = await Script.create({
//       logline,
//       userId: user?._id, // Assign the user ID.
//       userUid,
//       userName,
//       email,
//       avatar: user?.avatar,
//       personalConnect,
//       synopsis,
//       phoneNumber,
//     })

//     if (script) {
//       res.status(201).json({
//         isSuccess: true,
//         message: 'File Saved Successfully....',
//         script, // Include the populated script details in the response
//       })
//     } else {
//       throw new Error('File could not be saved')
//     }
//   } catch (error) {
//     console.error('Error occurred during file upload:', error)
//     res.status(500).json({ message: 'Internal Server Error' })
//   }
// }

// Function to calculate the start and end of the current week
function getWeekDates() {
  const now = new Date()
  const currentDay = now.getUTCDay()
  const startOfWeek = new Date(now)
  startOfWeek.setUTCDate(now.getUTCDate() - currentDay)
  const endOfWeek = new Date(now)
  endOfWeek.setUTCDate(now.getUTCDate() + (6 - currentDay))
  return {
    startOfWeek,
    endOfWeek,
  }
}

// Import your User and Script models as needed.

export const uploadScript = async (req: Request, res: Response) => {
  console.log('upload script - ')
  try {
    const {
      synopsis,
      userUid,
      userName,
      logline,
      personalConnect,
      email,
      phoneNumber,
    } = req.body

    // Check if any of the mandatory fields are missing or empty
    if (!synopsis || !logline || !personalConnect || !email || !phoneNumber) {
      res
        .status(400)
        .json({ isValidationError: true, message: 'All fields are mandatory' })
      return
    }

    // Check if the user with the provided ID exists
    const user = await User.findOne({ uid: userUid })

    if (!user) {
      res.status(400).json({ message: 'User not found..' })
      return
    }

    // Calculate the start and end of the current week
    const now = new Date()
    const currentDay = now.getUTCDay() // 0 (Sunday) to 6 (Saturday)
    const startOfWeek = new Date(now)
    startOfWeek.setUTCDate(now.getUTCDate() - currentDay) // Adjust for the start of the week

    const endOfWeek = new Date(now)
    endOfWeek.setUTCDate(now.getUTCDate() + (6 - currentDay)) // Adjust for the end of the week

    console.log('currentWeekStart:', startOfWeek)
    console.log('currentWeekEnd:', endOfWeek)

    // Check if the user has already submitted a script within the current week
    const weekInfo = getWeekDates()
    const existingScript = await Script.findOne({
      userId: user._id,
      uploadDate: { $gte: weekInfo.startOfWeek, $lte: weekInfo.endOfWeek },
    })

    console.log('existing script:', existingScript)

    if (existingScript) {
      res.status(400).json({
        isSubmittedWithinWeek: true,
        message:
          'You have already submitted a script this week. resubmit next week',
      })
      return
    }

    const script = new Script({
      logline,
      userId: user._id,
      userUid,
      userName,
      email,
      avatar: user.avatar,
      personalConnect,
      synopsis,
      phoneNumber,
    })

    await script.save()

    // console.log('created script:', script)
    res.status(201).json({
      isSuccess: true,
      message: 'File Saved Successfully',
      script,
    })
  } catch (error) {
    console.error('Error occurred during file upload:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// get all scripts..

export const getAllScripts = asyncHandler(
  async (req: Request, res: Response) => {
    const allScripts = await Script.find({})

    res.status(200).json({
      allScripts,
    })
  }
)

// get all script based on user id

export const getAllScriptForUSer = asyncHandler(
  async (req: Request, res: Response) => {
    const { userUid } = req.params

    const scripts = await Script.find({ userUid: userUid })
    res.status(200).json({
      scripts,
    })
  }
)

//fetch one script

export const getOneScript = asyncHandler(
  async (req: Request, res: Response) => {
    const { scriptId } = req.params

    console.log('script id', scriptId)

    const script = await Script.findById(scriptId)

    console.log('script-----', script)

    if (script) {
      res.status(200).json({
        isSuccess: true,
        script,
      })
    } else {
      throw new Error("Could'nt find the script")
    }
  }
)

// add to liked script
export const addLikedScript = async (req: Request, res: Response) => {
  const { scriptId } = req.body
  console.log('like script route', scriptId)
  try {
    // Check if the script with the given ID exists
    const script = await Script.findById(scriptId).exec()
    console.log('exist:?', script)
    if (!script) {
      return res.status(404).json({ error: 'Script not found' })
    }

    // Check if the liked script already exists for the given user and script
    const existingLikedScript = await LikedScript.findOne({
      script: scriptId,
    }).exec()

    if (existingLikedScript) {
      return res.status(400).json({ error: 'Liked script already exists' })
    }

    // Create a new liked script
    const newLikedScript = new LikedScript({
      script: scriptId,
    })

    // Save the new liked script
    await newLikedScript.save()

    res.status(201).json({
      isSuccess: true,
      message: 'Liked Successfully',
      newLikedScript,
    })
  } catch (error) {
    res.status(500).json({ error: 'Error adding liked script' })
  }
}

// get all liked script

export const getAllLikedScripts = async (req: Request, res: Response) => {
  try {
    console.log('fetch all liked scripts- was here')
    const likedScripts = await LikedScript.find().populate('script').exec()

    res.json(likedScripts)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching liked scripts' })
  }
}

// delete liked script

export const deleteLikedScript = async (req: Request, res: Response) => {
  const { scriptId } = req.params // Get the ID from the request params
  console.log('delete liked route', scriptId)
  try {
    const deletedScript = await LikedScript.findByIdAndRemove(scriptId).exec()

    if (!deletedScript) {
      return res.status(404).json({ error: 'Liked script not found' })
    }

    res.json({ isSuccess: true, message: 'Liked script deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting liked script' })
  }
}
