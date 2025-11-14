import fs from "node:fs/promises";
import express from "express";
const app = express();
app.use(express.json());

export const getUsers = async () => {
  const userRawData = await fs.readFile("users.json", "utf-8");
  const users = JSON.parse(userRawData);
  return users;
};
app.post("/login", async (req, res) => {
  const users = await getUsers();
  const username = req.body.username;
  const password = req.body.password;
  const user = users.find((value) => {
    return value.username === username && value.password === password;
  });
  if (!user) {
    res.send("Username or password wrong");
  } else {
    res.send("Login successful");
  }
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const passwordVerify = req.body.passwordVerify;
  if (password !== passwordVerify) {
    res.send("Enter same password!");
  }
  const users = await getUsers();
  const user = users.find((value) => {
    return value.username === username;
  });
  if (user) {
    res.send("Username not valid");
  }
  users.push({ username, password, balance: 0 });
  const userData = JSON.stringify(users);
  await fs.writeFile("users.json", userData, "utf-8");
  res.send("Signed up successfully");
});
app.listen(3003, () => {
  console.log("3003");
});
