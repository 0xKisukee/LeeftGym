'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('exercises', [
      {
        id: 1,
        order: 1,
        rest_time: 90,
        workout_id: 1,
        exo_id: 1, // Référence à l'exo "Dips"
      },
      {
        id: 2,
        order: 2,
        rest_time: 180,
        workout_id: 1,
        exo_id: 3, // Référence à l'exo "Squat"
      },
      {
        id: 3,
        order: 3,
        rest_time: 180,
        workout_id: 1,
        exo_id: 4, // Référence à l'exo "Soulevé de terre"
      }
    ], {});

    // Remet à jour le compteur de la séquence
    await queryInterface.sequelize.query(`
      SELECT setval('exercises_id_seq', (SELECT MAX(id) FROM "exercises"));
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exercises', null, {});
  }
}; 