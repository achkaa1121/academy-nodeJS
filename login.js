const loginButton = document.getElementById("loginButton");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailValue = email.value;
const passwordValue = password.value;
const loginButtonFunc = async () => {
  const response = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailValue, passwordValue }),
  });
  console.log("L");
  console.log(emailValue, passwordValue);
};
loginButton.addEventListener("click", loginButtonFunc);
