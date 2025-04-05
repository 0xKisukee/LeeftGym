'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('exos', [
      {
        id: 1,
        name: 'Dips',
      },
      {
        id: 2,
        name: 'Pompes',
      },
      {
        id: 3,
        name: 'Squat',
      },
      {
        id: 4,
        name: 'Soulevé de terre',
      },
      {
        id: 5,
        name: 'Pull-ups',
      }
    ], {});

    // Remet à jour le compteur de la séquence
    await queryInterface.sequelize.query(`
      SELECT setval('exos_id_seq', (SELECT MAX(id) FROM "exos"));
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exos', null, {});
  }
}; 