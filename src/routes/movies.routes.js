const { Router } = require("express");
const MoviesController = require("../controllers/moviesController.js");

const moviesRouter = Router();

const movieController = new MoviesController();

moviesRouter.get("/", movieController.index);
moviesRouter.post("/:user_id", movieController.create);
moviesRouter.delete("/:id", movieController.delete);
moviesRouter.get("/:id", movieController.show);


module.exports = moviesRouter;