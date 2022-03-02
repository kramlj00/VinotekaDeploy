"use strict";

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("Users", [
        {
          name: "Admin",
          email: "admin@gmail.com",
          password: bcrypt.hashSync("1234", 8),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ivan",
          email: "ivan@gmail.com",
          password: bcrypt.hashSync("1234", 8),
          isAdmin: false,
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
    return queryInterface.bulkDelete("Users", null, {});
  },
};
