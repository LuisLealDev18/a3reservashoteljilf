const express = require('express');
const user = require('./routes/user');

const app = express();
app.use(express.json());

app.use('/user', user);
// app.use('/Cadastro', express.static('Cadastro'));
// app.use('/ConsultarHistorico', express.static('ConsultarHistorico'));
// app.use('/RegistrarNotas', express.static('RegistrarNotas'));
// app.use('/RegistrarFuncionarios', express.static('RegistrarFuncionarios'));
// app.use('/GerenciamentoFuncionarios', express.static('GerenciamentoFuncionarios'));

module.exports = app;
