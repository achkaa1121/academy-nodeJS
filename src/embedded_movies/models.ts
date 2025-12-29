import { Document, Schema, model } from "mongoose";

interface IRating {
  rating: number;
  numReviews: number;
  meter?: number;
}

interface ITomatoes extends Document {
  viewer: IRating;
  fresh?: number;
  critic?: IRating;
  rotten?: number;
  dvd?: Date;
  website?: string;
  production?: string;
  lastUpdated: Date;
}

export interface IEmbeddedMoviesDocument extends Document {
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: Date;
  directors: string[];
  rated: string;
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastupdated: string;
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  countries: string[];
  type: string;
  tomatoes: ITomatoes;
  num_mflix_comments?: number;
  plot_embedding: Buffer;
  plot_embedding_voyage_3_large: Buffer;
}

const TomatoesSchema: Schema<ITomatoes> = new Schema(
  {
    viewer: {
      type: {
        rating: { type: Number },
        numReviews: { type: Number },
        meter: { type: Number },
      },
      required: true,
    },

    fresh: Number,
    critic: {
      rating: { type: Number },
      numReviews: { type: Number },
      meter: { type: Number },
    },
    rotten: Number,
    dvd: Date,
    website: String,
    production: String,
    lastUpdated: Date,
  },
  { _id: false }
);

const embeddedMovieSchema: Schema<IEmbeddedMoviesDocument> = new Schema({
  plot: { type: String, required: true },
  genres: { type: [String], required: true },
  runtime: { type: Number, required: true },
  cast: { type: [String], required: true },
  poster: { type: String, required: true },
  title: { type: String, required: true },
  fullplot: { type: String, required: true },
  languages: { type: [String], required: true },
  released: { type: Date, required: true },
  directors: { type: [String], required: true },
  rated: { type: String, required: true },
  awards: {
    wins: { type: Number },
    nominations: { type: Number },
    text: { type: String },
  },
  lastupdated: { type: String, required: true },
  year: { type: Number, required: true },
  imdb: {
    rating: { type: Number, required: true },
    votes: { type: Number, required: true },
    id: { type: Number, required: true },
  },
  countries: { type: [String], required: true },
  type: { type: String, required: true },
  tomatoes: TomatoesSchema,
  num_mflix_comments: Number,
  plot_embedding: { type: Buffer, required: true },
  plot_embedding_voyage_3_large: { type: Buffer, required: true },
});

export const Embedded_Movies = model<IEmbeddedMoviesDocument>(
  "embedded_movies",
  embeddedMovieSchema,
  "embedded_movies"
);
