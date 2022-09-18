const AppError = require("../utils/Apperror.js");
const sqliteConnection = require("../database/sqlite");
const  { hash, compare } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
    
    if(checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    } 

    const hashedPassword = await hash(password, 8);

    await database.run("INSERT INTO users (name, email, password) VALUES(?, ?, ?)", [name, email, hashedPassword]);
    
    return response.status(201).json();
  }
  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
    if(!user) {
      throw new AppError("Usuário não encontrado na base de dados.");
    }

    const userWithUpdateEmail = await database.get("SELECT email FROM users WHERE email = (?)", [email]);
    
    if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("O e-mail informado já está sendo utilizado.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new AppError("A senha antiga precisa ser informada.");
    }

    if(password && old_password) {
      const checkPassword = await compare(old_password, user.password);

      if(!checkPassword) {
        throw new AppError("As senhas não conferem!")
      }

      user.password = await hash(password, 8);
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      update_at = DATETIME('now'),
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
    );

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("users").where({ is }).delete();
  }
}
 
module.exports = UsersController;