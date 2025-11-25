import express from "express";
// import { bankRouter } from "./routers/bank.js";
import { userRouter } from "./routers/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", (req, res, next) => {
  const userId = req.cookies.user;

  if (userId && req.path === "/login.html") {
    return res.redirect("/bank.html");
  }

  if (!userId && req.path === "/bank.html") {
    return res.redirect("/login.html");
  }

  if (userId) {
    const user = {
      emai: "admin@gmail.com",
      firstName: "1321",
    };

    req.user = user;
  }

  next();
});
// app.use("/bank", bankRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("3000");
});
