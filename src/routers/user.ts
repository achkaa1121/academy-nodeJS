import express from "express";
import {
  createUser,
  updateUser,
  getUsers,
  deleteUser,
  getUserAccounts,
} from "../controllers/user.ts";
import { login } from "../controllers/auth.js";
export const userRouters = express.Router();

//user tei holbootoi post route uud

userRouters.post("/create", createUser);
userRouters.post("/update", updateUser);
userRouters.post("/delete", deleteUser);
userRouters.post("/login", login);
//user tei holbootoi get route uud

userRouters.get("/get-users", getUsers);
userRouters.get("/get-user-accounts", getUserAccounts);
