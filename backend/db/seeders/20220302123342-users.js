"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("Users", [
        {
          type_id: 1,
          name: "Admin",
          email: "admin@gmail.com",
          password: bcrypt.hashSync("1234", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type_id: 2,
          name: "Ivan",
          email: "ivan@gmail.com",
          password: bcrypt.hashSync("1234", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type_id: 2,
          name: "Luka",
          email: "luka@gmail.com",
          password: bcrypt.hashSync("1234", 8),
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
