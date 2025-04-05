'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sets', [
      {
        id: 1,
        order: 1,
        weight: 0,
        reps: 12,
        completed: true,
        exercise_id: 1,
      },
      {
        id: 2,
        order: 2,
        weight: 0,
        reps: 12,
        completed: true,
        exercise_id: 1,
      },
      {
        id: 3,
        order: 1,
        weight: 80,
        reps: 5,
        completed: true,
        exercise_id: 2,
      },
      {
        id: 4,
        order: 2,
        weight: 80,
        reps: 5,
        completed: true,
        exercise_id: 2,
      },
      {
        id: 5,
        order: 1,
        weight: 100,
        reps: 8,
        completed: true,
        exercise_id: 3,
      }
    ], {});

    // Remet à jour le compteur de la séquence
    await queryInterface.sequelize.query(`
      SELECT setval('sets_id_seq', (SELECT MAX(id) FROM "sets"));
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sets', null, {});
  }
}; 