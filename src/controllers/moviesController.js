const AppError = require("../utils/Apperror.js");
const sqliteConnection = require("../database/sqlite");

class MoviesController {
  async create(request, response) {
    const { title, description, rating } = request.body;
    const { user_id } = request.params;
    
    const database = await sqliteConnection();

    // CONTINUAR AQUI 15/09!!!
  }
}

module.exports = MoviesController;