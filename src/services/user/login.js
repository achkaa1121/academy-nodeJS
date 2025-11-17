import fs from "node:fs/promises";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
export const loginServices = async (username, password) => {
  const users = JSON.parse(require("../../../data/users.json"));
  const user = users.find((value) => {
    return value.username === username && value.password === password;
  });
  if (!user) {
    return false;
  } else {
    return true;
  }
};
