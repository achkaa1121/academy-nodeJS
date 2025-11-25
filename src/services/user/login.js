import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const loginServices = async (email, password) => {
  const dataPath = path.join(__dirname, "../../../data/users.json");
  const usersData = await fs.readFile(dataPath, "utf-8");
  const users = await JSON.parse(usersData);
  const user = users.find((value) => {
    return value.email === email && value.password === password;
  });
  if (!user) {
    return;
  } else {
    return email;
  }
};
