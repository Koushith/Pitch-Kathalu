import express from "express";

import {
  authUser,
  getAllUsers,
  getUserById,
} from "../../controllers/user/user.controller.js";
import { protectedRoute } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(authUser);
router.route("/:id").get(getUserById);

export default router;
