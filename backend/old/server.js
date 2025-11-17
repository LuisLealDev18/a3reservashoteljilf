// Importando as dependências
const express = require('express');
const app = express();

// Middleware para aceitar requisições em JSON
app.use(express.json());

// Banco de dados em memória (substituindo o MySQL)
let reservas = []; // Array para armazenar as reservas

// Rota para criar uma nova reserva
app.post('/api/reservas', (req, res) => {
  const { nome, dataEntrada, dataSaida, numeroQuartos, valorTotal } = req.body;

  // Criando uma nova reserva
  const novaReserva = { nome, dataEntrada, dataSaida, numeroQuartos, valorTotal, id: reservas.length + 1 };
  
  // Adicionando a reserva ao banco de dados (array)
  reservas.push(novaReserva);
  
  // Retornando a nova reserva criada
  res.status(201).json(novaReserva);
});

// Rota para obter todas as reservas
app.get('/api/reservas', (req, res) => {
  res.status(200).json(reservas); // Retorna todas as reservas em formato JSON
});

// Definindo a rota principal
app.get('/', (req, res) => {
  res.send('API de Reservas de Hotel');
});

// Definindo a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
