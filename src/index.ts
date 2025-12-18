import express from "express";
import type { Request, Response } from "express";
import { userRouters } from "./routers/user.ts";
import { bankRouters } from "./routers/bank.ts";
import { connectDb } from "./db.ts";
import { request } from "express";

const app = express();

app.use(express.json());

app.use("/user", userRouters);
app.use("/bank", bankRouters);

await connectDb();

app.listen(3001, () => {
  console.log("express app running at 3001");
});
