const { Router } = require("express");
const MoviesController = require("../controllers/moviesController.js");

const moviesRouter = Router();

const movieController = new MoviesController();

moviesRouter.post("/:user_id", movieController.create);
moviesRouter.delete("/id", movieController.delete);


module.exports = moviesRouter;