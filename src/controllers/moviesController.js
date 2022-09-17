const knex = require("../database/knex");
const AppError = require("../utils/Apperror.js");

class MoviesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    if(rating < 1 || rating > 5) {
      throw new AppError("Digite uma nota entre 1 eté 5.");
    }
    
    const movie_id = await knex("movies").insert({
      title,
      description,
      rating,
      user_id
    });

    const insertTags = tags.map(name => {
      return {
        movie_id,
        user_id,
        name
      }
    });

    await knex("tags").insert(insertTags);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const movie = await knex("movies").where({ id }).first();

    return response.json({
      movie
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movies").where({ id }).delete();

    return response.json();
  }
}

module.exports = MoviesController;