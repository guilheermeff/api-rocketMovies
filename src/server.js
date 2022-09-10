const express = require("express");
const app = express();

const PORT = 3333;

app.get('/', (request, response) => {
  response.send("Hello World! teste1 teste2")
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));