import express from "express";
import { uploadScript } from "../../controllers/script/script.controller.js";

const router = express.Router();

router.route("/").post(uploadScript);

export default router;
