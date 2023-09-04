import express from "express";

import { getLeaderboard } from "../../controllers/post/post.controller.js";
import {
  authUser,
  getAllUsers,
  getUserById,
} from "../../controllers/user/user.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(authUser);
router.route("/leaderboard").get(getLeaderboard);
router.route("/:id").get(getUserById);

export default router;
