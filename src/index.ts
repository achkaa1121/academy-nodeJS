import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose, { ObjectId } from "mongoose";
import { typeDefs, resolvers } from "./apolloServer.ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "./movies/db/models.ts";
dotenv.config();
mongoose
  .connect(
    "mongodb+srv://Achka1121:QrPqkWmvZrs2v835@backend-lesson.zrskizs.mongodb.net/sample_mflix?appName=backend-lesson"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
  });

export interface IContext {
  user: {
    email: string;
    _id: ObjectId;
  };
}

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    // header token oo avna
    const token = req.headers.authorization || "";
    if (token && process.env.JWT_SECRET) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.log(err, "Invalid or expired token");
      }
      const user = jwt.decode(token);
      const userExist = await User.findOne({ email: user.email });
      return {
        user: userExist,
      };
    }
    // user ee db ees haina

    ///token
    // return {
    //   user: {
    //     name: "asdasd",
    //   }, // iishee damjuulna
    // };
  },
});

console.log(`🚀  Server ready at: ${url}`);
// import express from "express";
// import { ApolloServer } from "apollo-server-express";
// import mongoose from "mongoose";
// import { typeDefs } from "./graphql/schemas.ts";
// import { resolvers } from "./graphql/resolvers.ts";

// const startServer = async () => {
//   const app = express();

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   },);
//   await server.start();
//   server.applyMiddleware({ app: app as any });
//   await mongoose.connect(
//     "mongodb+srv://Achka1121:QrPqkWmvZrs2v835@backend-lesson.zrskizs.mongodb.net/sample_mflix?appName=backend-lesson"
//   );
//   console.log("MongoDB connected");

//   app.listen({ port: 4000 }, () =>
//     console.log(`Server running at http://localhost:4000${server.graphqlPath}`),
//   );
// };

// startServer();
