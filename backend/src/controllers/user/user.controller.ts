import express, { Request, Response } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { User } from "../../models/user.model.js";

/**
 *  @description - store the response from firebase-
 */
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { displayName, email, photoURL, uid, user } = req.body;

  const query = await User.findOne({ uid });
  //console.log("query-exist", query);
  if (!query) {
    const user = await User.create({
      displayName,
      email,
      avatar: photoURL,
      uid,
    });

    res.status(201).json({
      message: "user created successfully",
      user,
    });
  }
});

/**
 * @desc    Get all users
 */
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const query = await User.find({});

  if (!query) {
    throw new Error("No user found");
  } else {
    res.status(200).json({
      success: true,
      data: query,
    });
  }
});

// export const getUserProfile = asyncHandler(
//   async (req: Request, res: Response) => {
//     const id = req.params.id;
//     console.log("id----", id);
//     console.log("middleware", req.body.user);
//     console.log("route was here inside get profile.........");

//     const user = await User.findOne({ uid: id });
//     console.log("user fond>? -yes", user);
//     if (!user) {
//       res.status(404);
//       throw new Error("User not found");
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       data: user,
//     });
//   }
// );

/**
 * @desc    Get user by id - for profile- active working
 */

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("route was here.........");
  console.log("id----", req.params.id);
  console.log("boduuuuuyyyy", req.params.user);
  const user = await User.findOne({ uid: id });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
    return;
  }
  console.log("user fond>? -yes");
  res.status(200).json({
    success: true,
    data: user,
  });
});

//delete user - admin only
