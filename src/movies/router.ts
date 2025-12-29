import { Router } from "express";
import {
  addMovie,
  imdbChanger,
  genreChanger,
  deleter,
  pointFivePlus,
  plusNine,
  drama,
  director,
  eachGenre,
  eachActors,
  mostGenre,
  eachGenreIMDB,
} from "./controller.ts";
export const movieRouter = Router();
movieRouter.post("/add", addMovie);
movieRouter.put("/imdb", imdbChanger);
movieRouter.put("/genre", genreChanger);
movieRouter.delete("/deleter", deleter);
movieRouter.post("/pointFivePlus", pointFivePlus);
movieRouter.get("/plusNine", plusNine);
movieRouter.get("/drama", drama);
movieRouter.get("/director", director);
movieRouter.get("/eachGenre", eachGenre);
movieRouter.get("/eachActors", eachActors);
movieRouter.get("/mostGenre", mostGenre);
movieRouter.get("/eachGenreIMDB", eachGenreIMDB);
