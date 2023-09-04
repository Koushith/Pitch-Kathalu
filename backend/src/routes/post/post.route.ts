import express from "express";

import {
  addPost,
  deletePost,
  firebaseToMongoId,
  getAllPosts,
  getPostById,
  getStatus,
  updatePost,
} from "../../controllers/post/post.controller.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(addPost);
router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);
router.route("/uid/:uid").get(firebaseToMongoId);
router.route("/status/:callbackId").get(getStatus);

export default router;
