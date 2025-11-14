import fs from "node:fs/promises";
import inquirer from "inquirer";
export const bankAnswer = async (users, user) => {
  const { bankOption } = await inquirer.prompt([
    {
      type: "select",
      name: "bankOption",
      message: "Options",
      choices: [
        { name: "Deposit", value: "deposit" },
        { name: "Withdraw", value: "withdraw" },
        { name: "History all", value: "history" },
        { name: "History deposit", value: "history-deposit" },
        { name: "History withdraw", value: "history-withdraw" },
        { name: "Check balance", value: "check-balance" },
        { name: "Transaction", value: "transaction" },
        { name: "Exit", value: "exit" },
      ],
    },
  ]);
  switch (bankOption) {
    case "deposit":
      await deposit(users, user);
      break;
    case "withdraw":
      await withdraw(users, user);
      break;
    case "history":
      history(users, user);
      break;
    case "check-balance":
      await checkBalance(users, user);
      break;
    case "exit":
      process.exit();
    case "history-deposit":
      await historyDeposit(users, user);
      break;
    case "history-withdraw":
      await historyWithdraw(users, user);
      break;
    case "transaction":
      await transaction(users, user);
      break;
  }
};
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
const deposit = async (users, user) => {
  let balance = parseInt(user.balance) || 0;
  const beforeBalance = balance;
  const { amount } = await inquirer.prompt([
    {
      type: "number",
      name: "amount",
      message: "Enter amount of deposit:",
    },
  ]);
  balance = balance + amount;
  user.balance = balance;
  console.log("Succesfully deposited.");
  return (
    await updateUser(
      users,
      user,
      user.balance,
      amount,
      "deposit",
      beforeBalance
    ),
    bankAnswer(users, user)
  );
};
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
