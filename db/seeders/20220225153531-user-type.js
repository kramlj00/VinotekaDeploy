"use strict";

module.exports = {
  up: async (queryInterface, sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("UserTypes", [
        {
          user_type: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_type: "Business",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_type: "Regular",
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
    return queryInterface.bulkDelete("UserTypes", null, {});
  },
};
