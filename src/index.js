import express from "express";
import cookieParser from "cookie-parser";
import { userRouters } from "./routers/user.js";
import { bankRouters } from "./routers/bank.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const userId = req.cookies.user;
  const publicPaths = ["/login.html", "/signup.html"];
  if (userId && publicPaths.includes(req.path)) {
    return res.redirect("/history.html");
  }
  if (!userId && req.path === "/history.html") {
    return res.redirect("/login.html");
  }
  next();
});
app.use(express.static("frontend"));
app.use("/user", userRouters);
app.use("/bank", bankRouters);
app.listen(3000, () => {
  console.log("express app running at 3000");
});
