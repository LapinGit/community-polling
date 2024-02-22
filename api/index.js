import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
dotenv.config();

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
