const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Exercise = sequelize.define('Exercise', {
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
    tableName: 'exercises',
    createdAt: false,
    updatedAt: false,
});

module.exports = Exercise;