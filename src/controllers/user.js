import { loginService } from "../services/user.js";
import { signupService } from "../services/user.js";
export const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await loginService(username, password);
  if (user) {
    res.cookie("user", user, {
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json({ message: "success", user: user });
  } else {
    return res.status(401).json({ message: "Wrong username or password" });
  }
};

export const signup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await signupService(username, password);
  if (user) {
    return res.status(200).json({ message: "success", user: user });
  } else {
    return res.status(401).json({ message: "User already exists" });
  }
};
