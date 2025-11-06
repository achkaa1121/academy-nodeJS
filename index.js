import fs, { write, writeFile } from "fs";
import { exit } from "process";
import readline from "readline";
import { deprecate } from "util";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function transactions(depoOrWithdr, user) {
  if (depoOrWithdr === "deposit") {
    const line = fs.readFileSync("users.txt", "utf-8")
  }else if (depoOrWithdr === "withdraw") {

  }else{console.log("Error")}
}
// readUsers(): users.txt-ээс унших
function readUsers() {
  if (!fs.existsSync("users.txt")) return [];
  const data = fs.readFileSync("users.txt", "utf-8").trim();
  return data.split("\n").map((line) => {
    const [username, password, balance] = line.split(",");
    return { username, password, balance: parseInt(balance) };
  });
  // 👉 Хэрэглэгчийн мэдээллийг унших код
}

// writeUsers(): users.txt-д бичих
function writeUsers(users) {
  const line = users.map((u) => ` ${u.username}, ${u.password}, ${u.balance}`);
  fs.writeFileSync("users.txt", line.join(" \n "));
}

// logTransaction(): transactions.txt-д бичих
function logTransaction(username, type, amount) {
  // 👉 Гүйлгээний лог бичих код

}

// =======================
// Register (шинэ хэрэглэгч)
// =======================
function register() {
  const user = readUsers();

  rl.question("Нэвтрэх нэрээ оруулна уу: ", (username) => {
    rl.question("Нууц үгээ оруулна уу: ", (password) => {
      rl.question("Дансан дахь мөнгөө оруулна уу: ", (balance) => {
        const newUser = { username, password, balance };
        user.push(newUser);
        writeUsers(user);
      });
    });
  });
  // 👉 Шинэ хэрэглэгчийн нэр асуух
  // 👉 PIN код асуух
  // 👉 Эхний үлдэгдэл асуух
  // 👉 users.txt-д хадгалах
}

// =======================
// Login + Menu
// =======================
function login() {
const users = readUsers()

  rl.question("Нэвтрэх нэрээ оруулна уу: ", (username) => {
    const user = users.find(user => user.username === username);
    console.log(user)
    if (!user) {
        console.log("Хэрэглэгч олдсонгүй");
        return;
    }

    rl.question("Нууц үгээ оруулна уу: ", (pass) => {
        const passTrueOrNot = user.password == pass
        if (!passTrueOrNot) {
            console.log("Нууц үг буруу байна");
            return;
        }
        showMenu(user);
    })
  })
  // 👉 Нэвтрэх нэр асуух
  // 👉 PIN код асуух
  // 👉 Хэрэглэгчийн мэдээллийг шалгах
  // 👉 showMenu дуудаж ажиллуулах
}

function showMenu(user) {

    console.log("amjilttai", user)

    rl.question("1. Үлдэгдэл шалгах, 2. Мөнгө нэмэх, 3. Мөнгө авах, 4. Гарах: ", (option) => {{
        switch(parseInt(option)){
            case 1:
                console.log(user.balance);
                break;
            case 2:
                rl.question("Нэмэх дүнгээ оруулна уу: ", (deposit) => {
                    const user = readUsers();
                    user.balance = user.balance + deposit;
                    fs.writeFile("users.txt", user.balance)
                })
                break;
            case 3:
                rl.question("Авах дүнгээ оруулах: ", (withdraw) => {
                    user.balance = user.balance - withdraw;
                })
                break;
            case 4:
                exit();
        }
    }})
  // 👉 Menu-г харуулах
  // 1. Үлдэгдэл шалгах
  // 2. Мөнгө нэмэх
  // 3. Мөнгө авах
  // 4. Гарах
  // 👉 Хэрэглэгчийн сонголтоор switch case ашиглах
}

// =======================
// Main
// =======================
console.log("==== ATM SYSTEM ====  1. Нэвтрэх 2. Бүртгүүлэх ");

rl.question("Сонголтоо оруулна уу: ", (startChoice) => {
  if (startChoice === "1") {
    login();
  } else if (startChoice === "2") {
    register();
  } else {
    console.log("⚠️ Буруу сонголт!");
    rl.close();
  }
});