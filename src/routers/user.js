import { Router } from "express";
import { login, signup } from "../controllers/user.js";

export const userRouters = new Router();

userRouters.post("/login", login);
userRouters.post("/signup", signup);
