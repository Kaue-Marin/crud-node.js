const express = require("express");
const app = express();

app
  .get("/curso", (req, res) => {
    // instruções que o servidor segue para entender o que fazer quando uma pessoa acessa um determinado endereço (URL)
    let mysql = require("mysql");

    let connection = mysql.createConnection({
      // conectando a um banco de dados

      host: "localhost", // local
      user: "root", // user
      password: "123456", // senha do banco
      database: "qikbyte", // nome do banco
    });

    connection.query("select DESCRICAO from curso; ", (err, result) => {
      res.send(result);
    });
  })
  .listen(3000, () => {
    console.log("servidor ativo");
  });
