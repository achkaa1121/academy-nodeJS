import express from "express";
import { createRequire } from "node:module";
import { login } from "../controllers/user.js";
import { signup } from "../controllers/user.js";
export const userRouter = new express.Router();
userRouter.post("/login", login);
userRouter.post("/signup", signup);
