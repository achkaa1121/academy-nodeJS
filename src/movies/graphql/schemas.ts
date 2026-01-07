import { gql } from "apollo-server-express";

export const userTypesDefs = gql`
  type User {
    name: String!
    email: String!
    password: String!
  }

  input SignupInput {
    email: String!
    name: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
`;

export const userMutationTypeDefs = `
   signup(input: SignupInput!): User
   login(input: LoginInput!): User
`;
