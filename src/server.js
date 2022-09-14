const express = require("express");
const routes = require("./routes");
const Apperror = require("./utils/Apperror");
const migrationsRun = require("./database/sqlite/migrations");



const app = express();
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof Apperror) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
 
  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "internal server error"
  })
})

migrationsRun();

const PORT = 3333;
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));