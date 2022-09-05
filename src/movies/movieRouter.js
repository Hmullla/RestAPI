const { Router } = require("express");
const movieRouter = Router();
const { createMovie, listMovie, updateMovie, deleteMovie, deleteMultipleMovies} = require("./movieControllers");
const { tokenCheck } = require("../middleware");

movieRouter.get("/movie/list", listMovie);
movieRouter.post("/movie/add", tokenCheck, createMovie);
movieRouter.delete("/movie/delete", tokenCheck, deleteMovie);
movieRouter.delete("/movie/deleteall", tokenCheck, deleteMultipleMovies);
movieRouter.put("/movie/edit", tokenCheck, updateMovie);

module.exports = movieRouter;