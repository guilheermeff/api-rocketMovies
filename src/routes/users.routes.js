const { Router } = require("express");
const UsersController = require("../controllers/usersController.js");

const usersRoutes = Router();

const userController = new UsersController();

usersRoutes.post("/", userController.create);
usersRoutes.put("/:id", userController.update);
usersRoutes.delete("/:id", userController.delete);


module.exports = usersRoutes;