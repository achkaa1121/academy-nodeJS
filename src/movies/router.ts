import { Router } from "express";
import {
  addMovie,
  imdbChanger,
  genreChanger,
  deleter,
  pointFivePlus,
  plusNine,
  drama,
  highestReveiw,
  director,
  eachGenre,
  eachActors,
  afterTwoThousand,
  mostGenre,
  criticNum,
  eachGenreIMDB,
} from "./controller.ts";
export const movieRouter = Router();
movieRouter.post("/add", addMovie);
movieRouter.put("/imdb", imdbChanger);
movieRouter.put("genre");
