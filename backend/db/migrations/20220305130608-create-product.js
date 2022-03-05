"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      bottleSize: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      countInStock: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      sort: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      seller: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      numReviews: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
