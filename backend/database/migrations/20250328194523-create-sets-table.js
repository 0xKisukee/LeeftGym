'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DECIMAL,
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
      workout_exercise_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workout_exercises',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sets');
  }
};