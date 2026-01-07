import { Movies } from "../db/models.ts";
export const queries = {
  movie: async (_: any, { id }: { id: string }) => {
    return await Movies.findById(id);
  },
};
