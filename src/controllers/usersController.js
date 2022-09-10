const AppError = require("../utils/Apperror.js");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    const database = await sqliteConnection();
  }  
}

module.exports = UsersController;