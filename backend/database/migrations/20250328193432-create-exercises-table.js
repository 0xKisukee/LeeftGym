'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exercises', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rest_time: { // Later it would be better if we can set a different rest time for each set
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 180,
      },
      workout_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workouts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      exo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('exercises');
  }
};