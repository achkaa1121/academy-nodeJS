import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import type { Document } from "mongoose";
import { Schema, model } from "mongoose";
import bodyParser from "body-parser";
import { movieRouter } from "./movies/router.ts";
// Express app
const app = express();
app.use(bodyParser.json());
app.use("/movie", movieRouter);
// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://Achka1121:QrPqkWmvZrs2v835@backend-lesson.zrskizs.mongodb.net/sample_mflix?appName=backend-lesson"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
  });

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
