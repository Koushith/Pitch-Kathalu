import express from "express";

import {
  getAllScripts,
  getAllScriptForUSer,
  uploadScript,
  getOneScript,
  addLikedScript,
  getAllLikedScripts,
  deleteLikedScript,
} from "../../controllers/script/script.controller.js";
import { getAllUsers } from "../../controllers/user/user.controller.js";

const router = express.Router();

router.route("/").post(uploadScript).get(getAllScripts);
router.route("/:userUid").get(getAllScriptForUSer);
router.route('/view-script/:scriptId').get(getOneScript)
router.route('/like').post(addLikedScript)
router.route('/all-liked').get(getAllLikedScripts)
router.route('/liked/:scriptId').delete(deleteLikedScript)



export default router
