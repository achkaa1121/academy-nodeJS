import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Rating {
    rating: Float
    numReviews: Int
    meter: Int
  }

  type Tomatoes {
    viewer: Rating
    critic: Rating
    rotten: Int
    lastUpdated: String
    fresh: Int
  }

  type Awards {
    wins: Int
    nominations: Int
    text: String
  }

  type User {
    name: String!
    email: String!
    password: String!
  }

  type Movie {
    id: ID!
    title: String!
    year: Int!
    plot: String!
    fullpolt: String!
    genre: [String!]!
    runtime: Int!
    cast: [String!]!
    poster: String!
    relased: String!
    languages: [String!]!
    directors: [String!]!
    awards: Awards
    tomatoes: Tomatoes
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
  type Mutation {
    signup(input: SignupInput!): User
    login(input: LoginInput!): User
  }
  type Query {
    movie(_id: ID): Movie
  }
`;
