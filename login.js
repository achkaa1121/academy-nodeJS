import { response } from "express";

const addBtn = document.getElementById("loginButton");

const blogs = [];

const addBtnFunc = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);
  const response = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return console.log(response, "response");
};
addBtn.addEventListener("click", addBtnFunc);
