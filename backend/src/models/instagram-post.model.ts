import mongoose, { Schema } from "mongoose";

const instagramPostSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    displayName: {
      type: String,
    },
    instagramPosts: [
      {
        postUrl: {
          type: String,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        instagramAccountName: {
          type: String,
        },
        htmlResponse: {
          type: String,
        },
        callbackId: {
          type: String,
        },
        templateId: {
          type: String,
        },
        template: {
          type: String,
        },
        templateUrl: {
          type: String,
        },
        proof: {
          type: String,
        },
        isVerified: {
          type: Boolean,
          default: false,
        },
        status: {
          type: String,
          default: "PENDING",
        },
        originalPublishDate: {
          type: Date,
        },
        postDate: {
          //TODO: - fix this- change to date
          type: String,
        },
        likes: {
          //TODO: - fix the type
          type: String,
        },
        comments: {
          type: String,
        },
      },
    ],
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const InstagramPost = mongoose.model(
  "InstagramPost",
  instagramPostSchema
);
