import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const loginService = async (username, password) => {
  const dataPath = path.join(__dirname, "../../data/users.json");
  const usersData = await fs.readFile(dataPath, "utf-8");
  const users = await JSON.parse(usersData);
  const user = users.find((u) => {
    return u.username == username && u.password == password;
  });
  if (!user) {
    return false;
  }
  return username;
};
export const signupService = async (username, password) => {
  const dataPath = path.join(__dirname, "../../data/users.json");
  const usersData = await fs.readFile(dataPath, "utf-8");
  const users = await JSON.parse(usersData);
  const user = users.find((u) => {
    return u.username == username && u.password == password;
  });
  if (!user) {
    const newUser = { username, password };
    users.push(newUser);
    const updatedData = JSON.stringify(users);
    await fs.writeFile(dataPath, updatedData, "utf-8");
    return true;
  }
  return false;
};
