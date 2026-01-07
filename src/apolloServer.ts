import {
  userTypesDefs,
  userMutationTypeDefs,
} from "./movies/graphql/schemas.ts";
import { mutations } from "./movies/graphql/mutations.ts";

export const typeDefs = `
  ${userTypesDefs}

  type Mutation {
    ${userMutationTypeDefs}
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Mutation: {
    ...mutations,
  },
};
