// upload script

import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { Script } from "../../models/script.model.js";
import { User } from "../../models/user.model.js";

// Upload Script after logining in and payment is success

export const uploadScript = async (req: Request, res: Response) => {
  try {
    const { scriptUrl, title, userUid, userName, email } = req.body; // Assuming you pass the user ID

    console.log(scriptUrl, title, userUid);

    // Check if the user with the provided ID exists
    const user = await User.findOne({ uid: userUid });
    console.log("user", user);

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    // Create the script document with the provided user reference
    const script = await Script.create({
      scriptUrl,
      title,
      userId: user?._id, // Assign the user ID.
      userUid,
      userName,
      email,
      avatar: user?.avatar,
    });

    if (script) {
      res.status(201).json({
        message: "File Saved Successfully",
        script, // Include the populated script details in the response
      });
    } else {
      res
        .status(400)
        .json({ message: "Something went wrong while uploading..." });
    }
  } catch (error) {
    console.error("Error occurred during file upload:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all scripts..

export const getAllScripts = asyncHandler(
  async (req: Request, res: Response) => {
    const allScripts = await Script.find({});

    res.status(200).json({
      allScripts,
    });
  }
);

// get one script based on user id

export const getOneScript = asyncHandler(
  async (req: Request, res: Response) => {
    const { userUid } = req.params;

    const scripts = await Script.find({ userUid: userUid });
    res.status(200).json({
      scripts,
    });
  }
);

// update script

// delete
