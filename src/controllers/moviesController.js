const knex = require("../database/knex");
const AppError = require("../utils/Apperror.js");

class MoviesController {
  async create(request, response) {
    const { title, description, rating } = request.body;
    const { user_id } = request.params;

    if(rating < 1 || rating > 5) {
      throw new AppError("Digite uma nota entre 1 eté 5.");
    }
    
    const movie_id = await knex("movies").insert({
      title,
      description,
      rating,
      user_id
    })
  }
  async delete(request, response) {
    const { id } = request.params;

    await knex("movies").where({ id }).delete();

    return response.json();
  }
}

module.exports = MoviesController;