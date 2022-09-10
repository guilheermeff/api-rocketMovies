const { Router } = require("express");
const UsersController = require("../controllers/usersController.js");

const usersRoutes = Router();

const userController = new UsersController();

usersRoutes.post("/", userController.create);


module.exports = usersRoutes;