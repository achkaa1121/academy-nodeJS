import type { Request, Response } from "express";
import { Movies } from "./model.ts";
import { Aggregate } from "mongoose";
export const addMovie = async (req: Request, res: Response) => {
  try {
    await Movies.create({
      plot: "Yes",
      genres: ["Sci-Fi", "Comedy"],
      runtime: 135,
      cast: ["Actor X", "Actor Y"],
      poster: "poster",
      title: "Galaxy Quest",
      fullplot: "fullpolt",
      languages: ["English"],
      released: 2023,
      directors: ["Jane Smith"],
      rated: "PG",
      lastupdated: "Never",
      year: 2023,
      imdb: {
        rating: 7.8,
        votes: 69,
        id: 420,
      },
      countries: ["English"],
      type: "Movie",
    });
    res.send(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const imdbChanger = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const genreChanger = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $push: { genre: "Adventure" } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const deleter = async (req: Request, res: Response) => {
  try {
    await Movies.deleteOne({ plot: "Yes" });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const pointFivePlus = async (req: Request, res: Response) => {
  try {
    await Movies.updateMany(
      { year: { $gte: 2015 } },
      { $inc: { "imdb.rating": 0.5 } }
    );
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const plusNine = async (req: Request, res: Response) => {
  try {
    const plusNineMovies = await Movies.find(
      { "imdb.rating": { $gte: 9 } },
      "title"
    );
    res.json(plusNineMovies);
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const drama = async (req: Request, res: Response) => {
  try {
    const dramaMovies = await Movies.find(
      { genres: "Drama" },
      "year imdb.rating"
    );
    res.json(dramaMovies);
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const director = async (req: Request, res: Response) => {
  try {
    const average = await Movies.aggregate([
      { $match: { directors: "Steven Spielberg" } },
      { $group: { _id: null, avgRating: { $avg: "$imdb.rating" } } },
    ]);
    res.status(200);
    res.json(average[0].avgRating);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const eachGenre = async (req: Request, res: Response) => {
  try {
    const result = await Movies.aggregate([
      { $unwind: "$genres" },
      { $group: { _id: "$genres", count: { $sum: 1 } } },
    ]);
    res.json(result);
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const eachActors = async (req: Request, res: Response) => {
  try {
    const numOfActors = await Movies.aggregate([
      {
        $project: {
          _id: 0,
          title: 1,
          actorCount: {
            $size: { $ifNull: ["$cast", []] },
          },
        },
      },
    ]);
    res.json(numOfActors);
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const mostGenre = async (req: Request, res: Response) => {
  try {
    const result = await Movies.aggregate([
      {
        $project: {
          title: 1,
          genresCount: {
            $size: { $ifNull: ["$genres", []] },
          },
        },
      },
      { $sort: { genresCount: -1 } },
      { $limit: 3 },
    ]);
    res.json(result);
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const eachGenreIMDB = async (req: Request, res: Response) => {
  try {
    const result = await Movies.aggregate([
      { $unwind: "$genres" },
      { $group: { _id: "$genres", avgRating: { $avg: "$imdb.rating" } } },
    ]);
    res.json(result);
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
