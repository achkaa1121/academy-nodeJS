import { Document } from "mongoose";

export interface IRating {
  rating: number;
  numReviews: number;
  meter: number;
}

export interface IMovie {
  title: string;
  year: number;
  plot: string;
  fullplot: string;
  genre: string[];
  runtime: number;
  cast: string[];
  poster: string;
  released: Date;
  languages: string[];
  directors: string[];
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
}

export interface IMoviesDocument extends IMovie, Document {
  title: string;
}
export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}
