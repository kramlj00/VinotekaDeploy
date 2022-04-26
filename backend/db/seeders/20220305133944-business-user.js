"use strict";

module.exports = {
  up: async (queryInterface, sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("BusinessUsers", [
        {
          user_id: "2",
          opg_name: "Korlat",
          oib: 1234567890123,
          street: "Benkovačka",
          house_number: 11,
          city: "Benkovac",
          zip: 21000,
          county: "Zadarska",
          phone_number: "0918372625",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: "3",
          opg_name: "OPG Galić",
          oib: 9634567890123,
          street: "Drniška",
          house_number: 12,
          city: "Drniš",
          zip: 21004,
          county: "Šibensko-kninska",
          phone_number: "0956352145",
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
