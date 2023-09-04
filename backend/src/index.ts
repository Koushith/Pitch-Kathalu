import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { connectToDB } from "./utils/db.js";
import postRoutes from "./routes/post/post.route.js";
import userRoutes from "./routes/user/user.route.js";
import { verifyProofs } from "./controllers/post/post.controller.js";

// init
dotenv.config();
const app = express();
connectToDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/api", (req, res) => {
  res.send("This route works");
});

//user related
app.use("/api/users", userRoutes);

//post related
app.use("/api/posts", postRoutes);

// endpoint where Reclaim Wallet sends the proof to the backend
app.use(express.text({ type: "*/*" }));
app.post("/callback", verifyProofs);

//custom middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}`);
});
