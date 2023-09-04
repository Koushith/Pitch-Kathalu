import express, { Request, Response } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { User } from "../../models/user.model.js";

/**
 *  @description - store the response from firebase-
 */
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { displayName, email, photoURL, uid } = req.body;

  console.log("user data", displayName, email, photoURL, uid);

  const query = await User.findOne({ uid });
  console.log("query-exist", query);
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
  console.log("get all users working.");

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

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log("id----", id);
    const user = await User.findOne({ uid: id });
    console.log("user fond>? -yes", user);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

/**
 * @desc    Get user by id
 */

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("id----", id);
  const user = await User.findOne({ uid: id });
  console.log("user fond>? -yes", user);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
    return;
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

//delete user - admin only
