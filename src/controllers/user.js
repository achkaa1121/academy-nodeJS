import { loginServices } from "../services/user/login.js";
export const login = async (req, res) => {
  const email = req.body.emailValue;
  const password = req.body.passwordValue;
  const user = await loginServices(email, password);
  if (!user) {
    return res.status(401).send("Wrong email or password");
  }
  res.cookie("user", "userID", {
    httpOnly: false,
    secure: false,
  });
  res.json({
    user: "userID",
  });
};

export const signup = () => {};
