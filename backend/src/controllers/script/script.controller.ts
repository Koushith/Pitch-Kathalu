// upload script

import { Request, Response } from 'express'

import { asyncHandler } from '../../middlewares/asyncHandler.js'
import { LikedScript, Script } from '../../models/script.model.js'
import { User } from '../../models/user.model.js'

// Upload Script after logining in and payment is success

export const uploadScript = async (req: Request, res: Response) => {
  try {
    const { synopsis, userUid, userName, logline, personalConnect, email } =
      req.body
    console.log('request was here')
    console.log({ synopsis, userUid, logline, personalConnect })

    // Check if the user with the provided ID exists
    const user = await User.findOne({ uid: userUid })

    if (!user) {
      res.status(400).json({ message: 'User not found' })
      return
    }

    const script = await Script.create({
      logline,
      userId: user?._id, // Assign the user ID.
      userUid,
      userName,
      email,
      avatar: user?.avatar,
      personalConnect,
      synopsis,
    })

    if (script) {
      res.status(201).json({
        isSuccess: true,
        message: 'File Saved Successfully....',
        script, // Include the populated script details in the response
      })
    } else {
      throw new Error('File could not be saved')
    }
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

    console.log("script id", scriptId)

    const script = await Script.findById(scriptId)

    console.log("script-----", script)

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
export const addLikedScript = async (req:Request, res:Response) => {
  const { scriptId } = req.body; 

  try {
    // Check if the script with the given ID exists
    const script = await Script.findById(scriptId).exec();

    if (!script) {
      return res.status(404).json({ error: 'Script not found' });
    }

    // Check if the liked script already exists for the given user and script
    const existingLikedScript = await LikedScript.findOne({
      script: scriptId,
    
    }).exec();

    if (existingLikedScript) {
      return res.status(400).json({ error: 'Liked script already exists' });
    }

    // Create a new liked script
    const newLikedScript = new LikedScript({
      script: scriptId,
    });

    // Save the new liked script to the database
    await newLikedScript.save();

    res.status(201).json(newLikedScript);
  } catch (error) {
    res.status(500).json({ error: 'Error adding liked script' });
  }
};


// get all liked script

export const getAllLikedScripts = async (req:Request, res:Response) => {
  try {
    const likedScripts = await LikedScript.find()
      .populate('script')
      .exec();

    res.json(likedScripts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching liked scripts' });
  }
};

// delete liked script

export const deleteLikedScript = async (req:Request, res:Response) => {
  const likedScriptId = req.params.id; // Get the ID from the request params

  try {
    const deletedScript = await LikedScript.findByIdAndRemove(likedScriptId).exec();

    if (!deletedScript) {
      return res.status(404).json({ error: 'Liked script not found' });
    }

    res.json({ message: 'Liked script deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting liked script' });
  }
};