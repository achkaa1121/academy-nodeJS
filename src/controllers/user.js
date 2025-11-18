import fs from "node:fs/promises";
import { createRequire } from "node:module";
export const login = (req, res) => {
  const userEmail = req.body.email;
  const pass = req.body.pass;
  const require = createRequire(import.meta.url);
  const loginServices = async (userEmail, pass) => {
    const users = await JSON.parse(require("../../data/users.json"));
    const user = users.find((value) => {
      return value.email === userEmail && value.password === pass;
    });
    if (!user) {
      res.send("wrong email or password");
    } else {
      res.send("success");
    }
  };
  loginServices(userEmail, pass);
};
export const signup = () => {};
