import { Schema, model } from "mongoose";
import { type IMoviesDocument, type IUserDocument } from "../types/movies.ts";

const UserSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const MovieSchema: Schema<IMoviesDocument> = new Schema({
  plot: { type: String, required: true },
  genre: { type: [String], required: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
  runtime: { type: Number, required: true },
  cast: { type: [String], required: true },
  poster: { type: String, required: true },
  languages: { type: [String], required: true },
  directors: { type: [String], required: true },
  awards: [
    {
      wins: { type: Number },
      nominations: { type: Number },
      text: { type: String },
    },
  ],
});

export const Movies = model<IMoviesDocument>("Movie", MovieSchema);
export const User = model<IUserDocument>("User", UserSchema);
