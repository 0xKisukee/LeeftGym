const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Set = sequelize.define('Set', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false, //  change to true for non-weighted exercises
        defaultValue: 0,
    },
    reps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'sets',
    createdAt: false,
    updatedAt: false,
});

module.exports = Set;