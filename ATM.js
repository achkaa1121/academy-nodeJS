import fs from "node:fs";
import Readline from "readline";
import { exit } from "node:process";
import promises from "node:fs/promises";
const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function readUsers() {
  const data = fs.readFileSync("users.json", "utf-8");
  return data.split("/n").map(line);
}
function writeUsers() {}
function logTransaction() {}
function register() {}
function login() {}
function showMenu() {}
