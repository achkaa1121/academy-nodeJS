import { User } from "../db/models.ts";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { IUser } from "../types/movies.ts";
import jwt from "jsonwebtoken";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;
export const mutations = {
  signup: async (_: any, { input }: { input: IUser }) => {
    const email = input.email;
    const name = input.name;
    const password = input.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isSignedUpAlr = await User.findOne({ email: email });
    if (isSignedUpAlr) {
      console.log("Already signed up.");
    } else {
      const data = await User.create({
        email,
        name,
        password: hashedPassword,
      });
      console.log("Signed up successfully.");
      return data;
    }
  },
  login: async (_: any, { input }: { input: IUser }) => {
    const email = input.email;
    const password = input.password;
    const user = await User.findOne(
      { email: email },
      { password: 1, email: 1, name: 1 }
    );
    if (!user) {
      console.log("User not found");
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    try {
      if (!isMatch) {
        console.log("Password wrong");
      } else {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            name: user.name,
          },
          SECRET_KEY!,
          { expiresIn: "1h" }
        );
        console.log("Logged in successfully", token);
        return token;
      }
    } catch (err) {
      console.log(err, "error");
    }
  },
};
