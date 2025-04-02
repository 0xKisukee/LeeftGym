const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Workout = sequelize.define('Workout', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_private: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    completed_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    is_routine: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'workouts',
    createdAt: true,
    updatedAt: false,
});

module.exports = Workout;