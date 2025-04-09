'use strict';

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
        type: Sequelize.DECIMAL,
        allowNull: false, //  change to true for non-weighted exercises
        defaultValue: 0,
      },
      reps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      exercise_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exercises',
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