import { Document, ObjectId } from "mongoose";

interface IRating {
  rating?: number;
  numReviews?: number;
  meter?: number;
}
interface ITomatoes {
  viewer: IRating;
  fresh?: number;
  critic?: IRating;
  rotten?: number;
  dvd?: Date;
  website?: string;
  production?: string;
  lastUpdated: Date;
}

export interface IMoviesDocument extends Document {
  plot?: string;
  genres?: string[];
  runtime?: number;
  cast?: string[];
  poster?: string;
  title: string;
  fullplot?: string;
  languages?: string[];
  released?: Date;
  directors?: string[];
  rated?: string;
  awards?: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastUpdated?: string;
  year: number;
  imdb?: {
    rating: number;
    votes: number;
    id: number;
  };
  countries?: string[];
  type?: string;
  tomatoes?: ITomatoes;
  num_mflix_comments?: number;
  userID: ObjectId;
}
export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
}
