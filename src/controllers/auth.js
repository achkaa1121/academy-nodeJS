import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const SECRET_KEY = process.env.JWT_SECRET;
export const login = async (req, res) => {
  const email = "atashi@gmail.com";
  const password = "SuperSecretPass";
  const hashedPassword = await bcrypt.hash(password, 10);
  // 2. Password шалгах
  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // 3. JWT token үүсгэх
  const token = jwt.sign(
    {
      email: email,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  // 4. Token буцаах
  res.json({
    message: "Login successful",
    token,
  });
};
