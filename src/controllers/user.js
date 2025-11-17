import { loginServices } from "../services/user/login.js";
import { signupServices } from "../services/user/signup.js";
export const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (loginServices(username, password)) {
    res.send("Logged in successfully");
  } else {
    res.send("Error");
  }
};
export const signup = () => {};
