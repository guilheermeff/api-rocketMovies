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

  async index(request, response) {
    const { title, tags, user_id } = request.query;

    let movies;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      movies = await knex("tags")
        .select([
          "movies.id",
          "movies.title",
          "movies.user_id"
        ])
        .where("movies.user_id", user_id)
        .whereLike("movies.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movies", "movies.id", "tags.movie_id")
        .orderBy("movies.title")
    } else {
      movies = await knex("movies")
        .where({ user_id })
        .orderBy("title")
        .whereLike("title", `%${title}%`)
    }

    const userTags = await knex("tags").where({ user_id })
    const moviesWithTags = movies.map( movie => {
      const movieTags = userTags.filter(tag => tag.movie_id === movie.id)

      return {
        ...movies,
        tags: movieTags
      }
    })

    return response.json(moviesWithTags);
  }
}

module.exports = MoviesController;