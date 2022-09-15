const { Router } = require("express");
const MoviesController = require("../controllers/moviesController.js");

const moviesRouter = Router();

const movieController = new MoviesController();

moviesRouter.get("/:user_id", movieController.create);
