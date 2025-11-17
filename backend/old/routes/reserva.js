const express = require('express');
const router = express.Router();

// Banco de dados em memória (array de reservas)
let reservas = [];  // Este array substitui o banco de dados

// Rota para criar uma nova reserva
router.post('/', (req, res) => {
  const { nome, dataEntrada, dataSaida, numeroQuartos, valorTotal } = req.body;
  
  // Criando uma nova reserva
  const novaReserva = { nome, dataEntrada, dataSaida, numeroQuartos, valorTotal, id: reservas.length + 1 };
  
  // Adicionando a reserva ao banco de dados (array)
  reservas.push(novaReserva);
  
  // Retornando a nova reserva criada
  res.status(201).json(novaReserva);
});

// Rota para obter todas as reservas
router.get('/', (req, res) => {
  res.status(200).json(reservas); // Retorna todas as reservas em formato JSON
});

module.exports = router;  // Exporta o router com as rotas
