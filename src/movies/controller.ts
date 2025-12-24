import type { Request, Response } from "express";
import { Movies } from "./model.ts";
export const addMovie = async (req: Request, res: Response) => {
  try {
    await Movies.create({
      plot: "Yes",
      genre: ["Sci-Fi", "Comedy"],
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
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const deleter = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const pointFivePlus = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const plusNine = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const drama = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const highestReveiw = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const director = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const eachGenre = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const eachActors = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const afterTwoThousand = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const mostGenre = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const criticNum = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const eachGenreIMDB = async (req: Request, res: Response) => {
  try {
    await Movies.updateOne({ plot: "Yes" }, { $set: { "imdb.rating": 8.2 } });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
