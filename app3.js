const express = require("express");
const app = express();
app.set("view engine", "ejs");
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true })); // o bodyparser é um middleawre que permite que eu consiga ver os dados que vem do navegador
let mysql = require("mysql");
let connection = mysql.createConnection({
  // conectando a um banco de dados

  host: "localhost", // local
  user: "root", // user
  password: "123456", // senha do banco
  database: "qikbyte", // nome do banco
});

app.get("/curso", (req, res) => {
  // instruções que o servidor segue para entender o que fazer quando uma pessoa acessa um determinado endereço (URL)
  connection.query("select * from curso; ", (err, result) => {
    res.render("./curso", { dados: result });
  });
});

app.post("/curso/salvar", (req, res) => {
  // usar rotas separadas para lidar com ações de criação ou atualização de dados
  let dados = req.body;

  connection.query("INSERT INTO curso SET ?", dados, (err, result) => {
    res.redirect("/curso");
  });
});

app.get("/editar/:id", (req, res) => {
  connection.query(
    "select * from curso where id =" + req.params.id,
    (err, linha) => {
      res.render("editar", {
        id: linha[0].ID,
        descricao: linha[0].DESCRICAO,
        carga_horaria: linha[0].carga_horaria,
      });
    }
  );
});

app.post("/atualizar/:id", (req, res) => {
  let dados = req.body;

  connection.query(
    "update curso set ? where id =" + req.params.id,
    dados,
    (err, result) => {
      res.redirect("/curso");
    }
  );
});

app.get("/curso/deletar/:id", (req, res) => {
  let id = req.params.id;
  connection.query("delete from curso where id =" + id, (err, result) => {
    res.redirect("/curso");
  });
});

app.listen(3010, () => {
  console.log("servidor ativo");
});
