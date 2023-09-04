import { reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";

import fs from "fs/promises";

import * as cheerio from "cheerio";

import puppeteer from "puppeteer-core";

import { Request, Response } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { InstagramPost } from "../../models/instagram-post.model.js";
import { User } from "../../models/user.model.js";
import { htmlParser } from "../../utils/html-parser.js";

//TODO: fix user path

const reclaim = new reclaimprotocol.Reclaim();

// get all post
export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await InstagramPost.find({});
  console.log("postssss", posts);

  if (posts) {
    res.status(200).json({
      posts,
    });
  } else {
    throw new Error("Something went wrong, couldnt fetch the posts");
  }
});

// get one post -> profile or user info
export const getPostById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("indide get one post -id", id); // this will be a mongo
  const user = await User.findById(id);

  const post = await InstagramPost.findOne({ user: id }).select(
    "-htmlResponse"
  );
  if (post) {
    res.status(200).json({
      post,
      displayName: user?.displayName,
    });
  } else {
    res.status(404).json({
      message: "No Post found",
    });
  }
});

// add post
// export const addPost = asyncHandler(async (req: Request, res: Response) => {
//   // const { user, postUrl, proof, isVerified, originalPublishDate } = req.body;
//   const { user, instagramPosts, votes } = req.body;
//   console.log("instagram posts", instagramPosts[0].postUrl);
//   //@ts-ignore //TODO: -fix type issue
//   const { instagramResponse, likes, comments, date } = await htmlParser(
//     instagramPosts[0].postUrl
//   );
//   console.log("instagram response");

//   console.log("date---", date);
//   console.log("comments----", comments);
//   console.log("likes------", likes);
//   // init reclaim

//   // generate url and save
//   const baseCBurl = process.env.CALLBACK_URL;
//   const callbackUrl = `${baseCBurl}/callback`;

//   // console.log("callback base", callbackUrl);

//   const request = reclaim.requestProofs({
//     title: "Prove you own this instagram account.",
//     baseCallbackUrl: callbackUrl,
//     requestedProofs: [
//       new reclaim.CustomProvider({
//         provider: "instagram-user",
//         payload: {},
//         //TODO:- WHAT ITEMS GOES INSIDE THIS?
//       }),
//     ],
//   });

//   const reclaimUrl = await request.getReclaimUrl({ shortened: true });

//   const { callbackId, template, id } = request;
//   // console.log("what the heck is template?", template);
//   // console.log(user, instagramPosts, votes);
//   // Find the existing document for the user
//   // if no user - new post, else append to the ig array
//   const userName = await User.findById(user);
//   console.log("userrrr-----", userName);
//   console.log("userrrrrrr", userName?.displayName);
//   const query = await InstagramPost.findOne({ user });

//   //console.log("quertyyyyyy", query);

//   if (!query) {
//     const post = await InstagramPost.create({
//       user,
//       displayName: userName?.displayName,
//       instagramPosts: {
//         postUrl: instagramPosts[0].postUrl,
//         user: userName?._id,
//         htmlResponse: String(instagramResponse),
//         likes: likes,
//         postDate: date,
//         comments: comments,
//         callbackId: String(callbackId),
//         templateId: String(id),
//         template: JSON.stringify(template),
//         templateUrl: String(reclaimUrl),
//         originalPublishDate: instagramPosts[0].originalPublishDate,
//       },
//       votes,
//     });

//     res.status(201).json({
//       message: "Story saved successfully",
//       userName: post.displayName,

//       reclaimUrl,
//       callbackId,
//     });
//   } else {
//     query.instagramPosts.push({
//       postUrl: instagramPosts[0].postUrl,
//       htmlResponse: String(instagramResponse),
//       likes: likes,
//       postDate: date,
//       comments: comments,
//       callbackId: String(callbackId),
//       templateId: String(id),
//       template: String(template),
//       templateUrl: String(reclaimUrl),
//       originalPublishDate: instagramPosts[0].originalPublishDate,
//       isVerified: false,
//       status: "PENDING",
//     });

//     const updatedPosts = await query.save();

//     res.status(200).json({
//       message: "Post appended successfully",
//       // updatedPosts,
//       reclaimUrl,
//       callbackId,
//     });
//   }
// });
// add post
export const addPost = asyncHandler(async (req: Request, res: Response) => {
  const { user, instagramPosts, votes } = req.body;
  console.log("instagram posts", instagramPosts[0].postUrl);
  //@ts-ignore
  const { instagramResponse, likes, comments, date } = await htmlParser(
    instagramPosts[0].postUrl
  );
  console.log("instagram response", instagramResponse);

  // init reclaim

  // generate url and save
  const baseCBurl = process.env.CALLBACK_URL;
  const callbackUrl = `${baseCBurl}/callback`;

  const request = reclaim.requestProofs({
    title: "Prove you own this instagram account.",
    baseCallbackUrl: callbackUrl,
    requestedProofs: [
      new reclaim.CustomProvider({
        provider: "instagram-user",
        payload: {},
      }),
    ],
  });

  const reclaimUrl = await request.getReclaimUrl({ shortened: true });

  const { callbackId, template, id } = request;

  console.log("is user is mongo id??---", user);

  // Find the existing document for the user
  // if no user - new post, else append to the instagramPost  array
  const userName = await User.findById(user);
  console.log("userrrr-----", userName);
  console.log("userrrrrrr", userName?.displayName);
  const query = await InstagramPost.findOne({ user });

  console.log("quertyyyyyy", query);

  if (!query) {
    const post = await InstagramPost.create({
      user,
      displayName: userName?.displayName,
      instagramPosts: [
        {
          postUrl: instagramPosts[0].postUrl,
          htmlResponse: String(instagramResponse), //TODO: remove this later- temp testing
          likes: likes,
          comments: comments,
          postDate: date,
          callbackId: String(callbackId),
          templateId: String(id),
          template: JSON.stringify(template),
          templateUrl: String(reclaimUrl),
          originalPublishDate: instagramPosts[0].originalPublishDate,
        },
      ],
      votes,
    });
    await post.save();
    res.status(201).json({
      message: "Story saved successfully",
      userName: post.displayName,
      post,
      reclaimUrl,
      callbackId,
    });
  } else {
    query.instagramPosts.push({
      postUrl: instagramPosts[0].postUrl,
      likes: likes,
      comments: comments,
      postDate: date,
      htmlResponse: String(instagramResponse), //TODO:- testing- remove this
      callbackId: String(callbackId),
      templateId: String(id),
      template: JSON.stringify(template),
      templateUrl: String(reclaimUrl),
      originalPublishDate: instagramPosts[0].originalPublishDate,
      isVerified: false,
      status: "PENDING",
    });

    const updatedPosts = await query.save();

    res.status(200).json({
      message: "Post appended successfully",
      userName: updatedPosts.displayName,
      updatedPosts,
      reclaimUrl,
      callbackId,
    });
  }
});

// update post
export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { user, postUrl } = req.body;
  res.send("update post works");
});

// delete post
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await InstagramPost.findOneAndUpdate({ id });

  res.status(200).json({
    message: "Post Deleted Successfully!!",
    post,
  });
});

// disputes- should be a table- user raises the disputes -> we verify that and add the ownership

export const firebaseToMongoId = asyncHandler(
  async (req: Request, res: Response) => {
    //takes in uid and returns mongoDBID

    const { uid } = req.params;

    const query = await User.findOne({ uid });
    if (!query) {
      res.status(404);
      throw new Error("no uid found");
    }

    res.status(200).json({
      mesesage: "uid found",
      mongoID: query._id,
      user: query.displayName,
    });
  }
);

export const verifyProofs = asyncHandler(
  async (req: Request, res: Response) => {
    const { callbackId } = req.query;

    console.log("Callback id----- from req.query", callbackId);

    const { proofs } = JSON.parse(decodeURIComponent(req.body));

    const isValidProof = await reclaim.verifyCorrectnessOfProofs(
      callbackId as string,
      proofs
    );
    console.log("isValidProof------", isValidProof);

    if (isValidProof) {
      const extractProofInfo = proofs[0]?.parameters;

      const parsedProof = JSON.parse(extractProofInfo);
      const profileName = parsedProof?.userName;

      console.log("profile name-----", profileName);

      const post = await InstagramPost.findOne(
        {},
        {
          instagramPosts: {
            $elemMatch: { callbackId: callbackId },
          },
        }
      );

      console.log("pst with cb id----", post);

      if (post) {
        const htmlResponse = post?.instagramPosts[0]?.htmlResponse;

        const regex = new RegExp(`${profileName}`, "i");
        const doesExist = regex.test(htmlResponse as string);

        console.log(typeof htmlResponse);

        if (doesExist) {
          console.log(`Variable '${profileName}' exists in the response.`);
          // Update the specific nested object within the array
          const update = await InstagramPost.updateOne(
            {
              _id: post._id,
              "instagramPosts.callbackId": callbackId,
            },
            {
              $set: {
                "instagramPosts.$.instagramAccountName": profileName,
                "instagramPosts.$.status": "VERIFIED",
                "instagramPosts.$.htmlResponse": String(htmlResponse),
                "instagramPosts.$.isVerified": true,
                "instagramPosts.$.proof": JSON.stringify(proofs),
              },
            }
          );

          const successHtmlResponse = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
              }
              .container {
                text-align: center;
                margin-top: 50px;
              }
              .success {
                color: green;
                font-size: 24px;
                margin-bottom: 20px;
              }
              .message {
                font-size: 18px;
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success">Proof Verified Successfully</div>
              <div class="message">Congratulations, your proof has been successfully verified!</div>
              <div class="message">You are the owner of the post.</div>
            </div>
          </body>
          </html>
        `;

          res.send(successHtmlResponse);

          // res.json({ msg: "Congrats- proof generated successfully" });
        } else {
          console.log(
            `Variable '${profileName}' does not exist in the response.`
          );

          const update = await InstagramPost.updateOne(
            {
              _id: post._id,
              "instagramPosts.callbackId": callbackId,
            },
            {
              $set: {
                "instagramPosts.$.status": "FAILED",
              },
            }
          );

          console.log("post deleted----", update);
          // res.json({
          //   message:
          //     "Failed to verify, page might be private or you are not the owner of that post!!",
          // });
          const errorHtmlResponse = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
              }
              .container {
                text-align: center;
                margin-top: 50px;
              }
              .error {
                color: red;
                font-size: 24px;
                margin-bottom: 20px;
              }
              .message {
                font-size: 18px;
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="error">Verification Failed</div>
              <div class="message">Failed to verify the proof.</div>
              <div class="message">The page might be private or you are not the owner of that post.</div>
            </div>
          </body>
          </html>
        `;

          res.send(errorHtmlResponse);
        }
      }
    } else {
      res.json({
        message: "Something went wrong. Please try again!!",
      });
    }
  }
);

export const getStatus = asyncHandler(async (req: Request, res: Response) => {
  const { callbackId } = req.params;
  console.log("callback id", callbackId);

  const postQuery = await InstagramPost.findOne({
    "instagramPosts.callbackId": callbackId,
  });

  // console.log("postsss", postQuery);

  if (!postQuery) {
    res.status(404).json({
      message: "No post was found",
    });
  } else {
    const instagramPost = postQuery.instagramPosts.find(
      (post) => post.callbackId === callbackId
    );

    if (!instagramPost) {
      res.status(404).json({
        message: "No post was found with the provided callback ID",
      });
    } else {
      res.status(200).json({
        status: instagramPost.status,
        isVerified: instagramPost.isVerified,
        postUrl: instagramPost.postUrl,
        callbackId: instagramPost.callbackId,
      });
    }
  }
});
export const getLeaderboard = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("Inside leaderboard route");
    const leaderboard = await InstagramPost.aggregate([
      {
        $group: {
          _id: "$user",
          count: { $sum: { $size: "$instagramPosts" } },
        },
      },
      {
        $sort: { count: -1 }, // Sort in descending order of count (high to low)
      },
    ]);

    const rankedLeaderboard = await Promise.all(
      leaderboard.map(async (entry) => {
        const user = await User.findById(entry._id);
        const score = entry.count * 12; // Example scoring formula
        return {
          displayName: user?.displayName,
          userId: user?.uid,
          email: user?.email,
          avatar: user?.avatar,
          count: entry.count,
          score,
        };
      })
    );

    // Sort the rankedLeaderboard based on the score in descending order (high to low)
    rankedLeaderboard.sort((a, b) => b.score - a.score);

    res.json(rankedLeaderboard);
  }
);
