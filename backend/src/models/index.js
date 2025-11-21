const sequelize = require('../config/db');
const User = require('./User');

// Associações podem ir aqui, se houver
module.exports = {
  sequelize,
  User
};
