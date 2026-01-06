import { Movies } from "../models/movies.ts";
import { User } from "../models/users.ts";
import type { IUser } from "../models/users.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
type IUserInput = {
  email: string;
  password: string;
};

type AuthPayload = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};
const SECRET_KEY = process.env.JWT_secret;
export const resolvers = {
  Query: {
    movie: async (_: any, { id }: { id: string }) => {
      return await Movies.findById(id);
    },
  },
  Mutation: {
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
      const user = await User.findOne({ email: email }, { password: 1 });
      if (!user) {
        console.log("User not found");
        throw new Error("User not found");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Password wrong");
      } else {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            name: user.name,
          },
          SECRET_KEY!
        );
        console.log("Logged in successfully", token);
        return token;
      }
    },
  },
};
