'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: '0xAymane',
        email: 'aymane@kisuke.com',
        password: '$2b$10$/IEbvMCIA1H07r4BUUZPPefFHyBK7yX90.gJz9yKfAwK3OZlrQrm.', // Hash de "A"
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