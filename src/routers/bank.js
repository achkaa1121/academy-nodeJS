import { Router } from "express";
import { logout, withdraw, deposit } from "../controllers/bank.js";

export const bankRouters = new Router();

bankRouters.post("/logout", logout);
bankRouters.post("/deposit", deposit);
bankRouters.post("/withdraw", withdraw);
