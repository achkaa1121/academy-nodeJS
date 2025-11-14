import fs from "node:fs/promises";
import express from "express";
const app = express();
app.use(express.json());
import { getUsers } from "./indexAPI.js";
const updateUser = async (
  users,
  user,
  balance,
  amount,
  type,
  beforeAmount,
  whom
) => {
  const userData = JSON.stringify(users);
  await fs.writeFile("users.json", userData, "utf-8");
  const historyRawData = await fs.readFile("history.json", "utf-8");
  const history = JSON.parse(historyRawData);
  const time = new Date().toISOString().split(".")[0] + "Z";
  const userHistories = history[user.username] || [];
  userHistories.push({
    type,
    amount,
    balance,
    balanceBefore: beforeAmount,
    time,
    whom,
  });
  history[user.username] = userHistories;
  const historyData = JSON.stringify(history);
  await fs.writeFile("history.json", historyData, "utf-8");
  return;
};
app.post("/login/deposit", async (req, res) => {
  const users = await getUsers();
  console.log(users, "sdasd");
  const user = req.body.username;
  const amount = parseInt(req.body.amount);
  const theUser = users.find((value) => {
    if (value.username === user);
    return value;
  });
  const beforeBalance = theUser.balance;
  let balance = parseInt(theUser.balance) || 0;
  balance = balance + amount;
  theUser.balance = balance;
  await updateUser(
    users,
    theUser,
    user.balance,
    amount,
    "deposit",
    beforeBalance
  );
  return res.send("Deposited successfully");
});
const withdraw = async (users, user) => {
  let balance = parseInt(user.balance) || 0;
  const beforeBalance = balance;
  const { amount } = await inquirer.prompt([
    {
      type: "number",
      name: "amount",
      message: "Enter amount of withdraw:",
    },
  ]);
  if (amount > balance) {
    console.log("Not enough balance! Try again");
    return withdraw(users, user);
  }
  balance = balance - amount;
  user.balance = balance;
  console.log("Successfully withdrew.");
  return (
    await updateUser(
      users,
      user,
      user.balance,
      amount,
      "withdraw",
      beforeBalance
    ),
    bankAnswer(users, user)
  );
};
const checkBalance = (users, user) => {
  console.log("Your balance:" + user.balance);
  return bankAnswer(users, user);
};
const history = async (users, user) => {
  const historyRawData = await fs.readFile("history.json", "utf-8");
  const history = JSON.parse(historyRawData);
  const userHistories = history[user.username] || [];
  console.log(user, userHistories);
  return bankAnswer(users, user);
};
const historyWithdraw = async (users, user) => {
  const historyRawData = await fs.readFile("history.json", "utf-8");
  const history = JSON.parse(historyRawData);
  const userHistories = history[user.username] || [];
  let data = [];
  const checkWIthdraw = (value) => {
    if (value.type === "withdraw") {
      return data.push(value);
    }
  };
  userHistories.filter(checkWIthdraw);
  console.log("Withdraw history:");
  console.log(data);
  return bankAnswer(users, user);
};
const historyDeposit = async (users, user) => {
  const historyRawData = await fs.readFile("history.json", "utf-8");
  const history = JSON.parse(historyRawData);
  const userHistories = history[user.username] || [];
  let data = [];
  const checkDeposit = (value) => {
    if (value.type === "deposit") {
      return data.push(value);
    }
  };
  userHistories.filter(checkDeposit);
  console.log("Deposit history:");
  console.log(data);
  return bankAnswer(users, user);
};
const transaction = async (users, user) => {
  let balance = parseInt(user.balance) || 0;
  const beforeBalance = balance;
  const { amount, toWhom } = await inquirer.prompt([
    {
      type: "number",
      name: "amount",
      message: "Enter amount of transaction:",
    },
    {
      type: "string",
      name: "toWhom",
      message: "Enter username of the receiver:",
    },
  ]);
  if (amount > balance) {
    console.log("Not enough balance! Try again");
    return transaction(users, user);
  }
  const userRawData = await fs.readFile("users.json", "utf-8");
  const usersData = JSON.parse(userRawData);
  const toUser = usersData.find((value) => {
    value.username === toWhom;
    return value;
  });
  const balanceR = toUser.balance;
  if (!toUser) {
    console.log("User not found");
    return transaction(users, user);
  }
  toUser.balance += amount;
  balance -= amount;
  user.balance = balance;
  console.log("Successfully transacted.");
  return (
    await updateUser(
      users,
      user,
      user.balance,
      amount,
      "withdraw",
      beforeBalance,
      toUser.username
    ),
    await updateUser(
      users,
      toUser,
      toUser.balance,
      amount,
      "received",
      balanceR,
      user.username
    ),
    bankAnswer(users, user)
  );
};
app.listen(3001, () => {
  console.log("3001");
});
