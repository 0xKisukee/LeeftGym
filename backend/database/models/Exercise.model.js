const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Exo = sequelize.define('Exo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'exos',
    createdAt: false,
    updatedAt: false,
});

module.exports = Exo;