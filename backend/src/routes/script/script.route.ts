import express from "express";
import {
  getAllScripts,
  getOneScript,
  uploadScript,
} from "../../controllers/script/script.controller.js";
import { getAllUsers } from "../../controllers/user/user.controller.js";

const router = express.Router();

router.route("/").post(uploadScript).get(getAllScripts);
router.route("/:userUid").get(getOneScript);

export default router;
