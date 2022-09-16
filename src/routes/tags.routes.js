const { Router } = require("express");

const TagsController = require("../controllers/tagsController.js");

const tagsRouter = Router();

const tagController = new TagsController();

tagsRouter.get("/:user_id", tagController.index);

module.exports = tagsRouter;