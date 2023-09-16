import express from "express";

import dotenv from "dotenv";

import axios from "axios";

import cors from "cors";

import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { connectToDB } from "./utils/db.js";
import scriptRoutes from "./routes/script/script.route.js";
import userRoutes from "./routes/user/user.route.js";

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

// user related
app.use("/api/users", userRoutes);

// Scripts related routes
app.use("/api/script", scriptRoutes);

app.post("/api/generate-payment-link", async (req, res) => {
  console.log("route was here--");
  try {
    const response = await axios.post(
      "https://api.instamojo.com/v2/payment_links/",
      {
        purpose: "Product Payment",
        amount: "10", // Set the amount for your product
        currency: "INR", // Set the currency code
      },
      {
        headers: {
          "X-Api-Key": "d17d0210dddf1073dbe3c6cb1880d1cf",
          "X-Auth-Token": "21a8d6834d755c0504bd4b9e1c36f74d",
        },
      }
    );

    const { longurl } = response.data;

    res.json({ paymentLink: longurl });
  } catch (error) {
    console.error("Error generating payment link:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// custom middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}`);
});
