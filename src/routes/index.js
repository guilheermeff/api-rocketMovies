const  { Router } = require("express");

const usersRouter = require("./users.routes.js");
const moviesRouter = require("./movies.routes.js");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movies", moviesRouter);


module.exports = routes;