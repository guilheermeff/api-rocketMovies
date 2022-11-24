require("express-async-errors");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/Apperror.js");

const migrationsRun = require("./database/sqlite/migrations");

const app = express();
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

migrationsRun();

const PORT = 3333;
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));