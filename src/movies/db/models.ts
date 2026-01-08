import mongoose, { Schema, Document, Model } from "mongoose";
import type { IUserDocument } from "../types/movies.ts";
const RatingSchema = new Schema(
  {
    rating: { type: Number },
    numReviews: { type: Number },
    meter: { type: Number },
  },
  { _id: false }
);

const TomatoesSchema = new Schema(
  {
    viewer: { type: RatingSchema, required: true },
    fresh: { type: Number },
    critic: { type: RatingSchema },
    rotten: { type: Number },
    dvd: { type: Date },
    website: { type: String },
    production: { type: String },
    lastUpdated: { type: Date, required: true },
  },
  { _id: false }
);

const AwardsSchema = new Schema(
  {
    wins: { type: Number, required: true },
    nominations: { type: Number, required: true },
    text: { type: String, required: true },
  },
  { _id: false }
);

const ImdbSchema = new Schema(
  {
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number },
  },
  { _id: false }
);

const MovieSchema = new Schema(
  {
    plot: { type: String },
    genres: [{ type: String }],
    runtime: { type: Number },
    cast: [{ type: String }],
    poster: { type: String },
    title: { type: String, required: true },
    fullplot: { type: String },
    languages: [{ type: String }],
    released: { type: Date },
    directors: [{ type: String }],
    rated: { type: String },
    awards: { type: AwardsSchema },
    lastupdated: { type: String },
    year: { type: Number, required: true },
    imdb: { type: ImdbSchema },
    countries: [{ type: String }],
    type: { type: String },
    tomatoes: { type: TomatoesSchema },
    num_mflix_comments: { type: Number },
    userID: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export const Movies =
  mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
