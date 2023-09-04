import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the Firebase response is available in the request
  //   if (!req.body.user) {
  //     res.status(401);
  //     throw new Error("Authorization failed..");
  //   }

  // Extract user information from the Firebase response

  let token = req.body.user;

  console.log("Token from middleware--------", token);

  if (!token) {
    res.status(401);
    throw new Error("No token, auth failed");
  } else {
    // Attach the user information to the request object
    // fetch user info from DB-
    //@ts-ignore
    req?.user = await User.findById(token.uid);
    //   req?.user = { userId, email, displayName };
    //@ts-ignore
    console.log("from middleware---", req?.user);
    // Continue to the next middleware or route handler
    next();
  }
};
