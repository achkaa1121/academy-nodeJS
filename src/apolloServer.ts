import {
  userTypesDefs,
  userMutationTypeDefs,
  movieQueryTypeDefs,
} from "./movies/graphql/schemas.ts";
import { mutations } from "./movies/graphql/mutations.ts";
import { queries } from "./movies/graphql/queries.ts";

export const typeDefs = `
  ${userTypesDefs}

   type Query {
    ${movieQueryTypeDefs}
  }

  type Mutation {
    ${userMutationTypeDefs}
  }

`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: { ...queries },
  Mutation: {
    ...mutations,
  },
};
