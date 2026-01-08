import {
  aTypeDefs,
  mutationTypeDefs,
  queryTypeDefs,
} from "./movies/graphql/schemas.ts";
import { mutations } from "./movies/graphql/mutations.ts";
import { queries } from "./movies/graphql/queries.ts";

export const typeDefs = `
  ${aTypeDefs}

   type Query {
    ${queryTypeDefs}
  }

  type Mutation {
    ${mutationTypeDefs}
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
