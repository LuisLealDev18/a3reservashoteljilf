const { DataTypes } = require('sequelize');
const User = require("../models/User")
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
  course: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Student.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

User.hasOne(Student, {
  foreignKey: 'userId'
});

module.exports = Student;
