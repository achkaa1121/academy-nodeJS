import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const login = (req, res) => {
  const userEmail = req.body.email;
  const pass = req.body.password;
  const dataPath = path.join(__dirname, "../../data/users.json");
  const users = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const user = users.find((u) => u.email === userEmail && u.password === pass);

  if (!user) return res.status(401).send("Wrong email or password");

  res.send("Success");
};

export const signup = () => {};
