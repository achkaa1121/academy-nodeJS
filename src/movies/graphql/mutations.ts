import { Movies, User } from "../db/models.ts";
import bcrypt from "bcrypt";
import type { IUserDocument, IMoviesDocument } from "../types/movies.ts";
import jwt from "jsonwebtoken";
import { type IContext } from "../../index.ts";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "secret";
export const mutations = {
  signup: async (_: any, { input }: { input: IUserDocument }) => {
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
  login: async (_: any, { input }: { input: IUserDocument }) => {
    const email = input.email;
    const password = input.password;
    const user = await User.findOne(
      { email: email },
      { password: 1, email: 1, name: 1, _id: 1 }
    );
    if (!user) {
      console.log("User not found");
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(SECRET_KEY);
    try {
      if (!isMatch) {
        console.log("Password wrong");
      } else {
        console.log("SECRET_KEYlogin", SECRET_KEY);
        const token = jwt.sign(
          {
            email: user.email,
            name: user.name,
            _id: user._id,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );

        console.log("Logged in successfully", token);
        return token;
      }
    } catch (err) {
      console.log(err, "error");
    }
  },
  addMovie: async (
    _: any,
    { input }: { input: IMoviesDocument },
    { user }: IContext
  ) => {
    console.log("user", user);
    try {
      if (user) {
        await Movies.create({
          title: input.title,
          year: input.year,
          userID: user._id,
        });
      }
    } catch (err) {
      console.log("Error while adding movie.", err);
    }
  },
};
