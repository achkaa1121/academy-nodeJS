import express from "express";

export const bankRouter = new express.Router();
bankRouter.get("/history", history);
bankRouter.post("/deposit", deposit);
bankRouter.post("/withdraw", withdraw);
