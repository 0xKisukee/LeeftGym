const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const WorkoutExercise = sequelize.define('WorkoutExercise', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rest_time: { // Later it would be better if we can set a different rest time for each set
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 180,
    },
}, {
    tableName: 'workout_exercises',
    createdAt: false,
    updatedAt: false,
});

module.exports = WorkoutExercise;