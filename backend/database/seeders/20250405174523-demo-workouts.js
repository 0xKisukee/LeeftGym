'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('workouts', [
      {
        id: 1,
        name: 'Entraînement Poitrine',
        is_private: false,
        started_at: null,
        completed_at: null,
        is_routine: false,
        user_id: 1,
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Entraînement Jambes',
        is_private: true,
        started_at: null,
        completed_at: null,
        is_routine: false,
        user_id: 1,
        createdAt: new Date()
      },
      {
        id: 3,
        name: 'Routine Matinale',
        is_private: false,
        started_at: null,
        completed_at: null,
        is_routine: true,
        user_id: 2,
        createdAt: new Date()
      }
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