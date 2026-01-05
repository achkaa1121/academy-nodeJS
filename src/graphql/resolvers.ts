import { Movies } from "../models/movies.ts";

export const resolvers = {
  Query: {
    movies: async () => {
      return await Movies.find({});
    },
    movie: async (_: any, { id }: { id: string }) => {
      return await Movies.findById(id);
    },
  },
};
