'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('workouts', [
      {
        id: 1,
        name: 'Entraînement Poitrine',
        is_private: false,
        started_at: "2025-04-05 23:57:33.034+02",
        completed_at: null,
        is_routine: false,
        user_id: 1,
        createdAt: new Date()
      },
    ], {});

    // Remet à jour le compteur de la séquence
    await queryInterface.sequelize.query(`
      SELECT setval('workouts_id_seq', (SELECT MAX(id) FROM "workouts"));
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('workouts', null, {});
  }
};