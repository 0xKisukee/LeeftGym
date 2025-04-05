'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        email: 'john@example.com',
        password: '$2b$10$/IEbvMCIA1H07r4BUUZPPefFHyBK7yX90.gJz9yKfAwK3OZlrQrm.', // À remplacer par un vrai hash
        createdAt: new Date(),
      },
    ], {});

    // Remet à jour le compteur de la séquence
    await queryInterface.sequelize.query(`
      SELECT setval('users_id_seq', (SELECT MAX(id) FROM "users"));
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
}; 