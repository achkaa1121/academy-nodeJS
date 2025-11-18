import fs from "node:fs/promises";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
export const loginServices = async (email, password) => {
  const users = await JSON.parse(require("../../../data/users.json"));
  const user = users.find((value) => {
    return value.email === email && value.password === password;
  });
  if (!user) {
    console.log;
  } else {
    return true;
  }
};
