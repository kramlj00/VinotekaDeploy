"use strict";

module.exports = {
  up: async (queryInterface, sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("BusinessUsers", [
        {
          user_id: 2,
          opg_name: "OPG Ramljak",
          oib: 1234567890123,
          street: "Some street",
          house_number: 11,
          city: "Split",
          zip: 21000,
          county: "Splitsko-dalmatinska",
          phone_number: "0918372625",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BusinessUsers", null, {});
  },
};
