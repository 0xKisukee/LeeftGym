'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('exos', [
      {
        id: 1,
        name: 'Pompes',
      },
      {
        id: 2,
        name: 'Tractions',
      },
      {
        id: 3,
        name: 'Développé couché',
      },
      {
        id: 4,
        name: 'Soulevé de terre',
      },
      {
        id: 5,
        name: 'Squat',
      },
      {
        id: 6,
        name: 'Curl Biceps',
      },
      {
        id: 7,
        name: 'Leg Extension',
      },
      {
        id: 8,
        name: 'Élévations latérales',
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