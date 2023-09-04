import express from "express";

const router = express.Router();

router.route("/").get(() => {
  console.log("wowowowo-----");
});

export default router;
