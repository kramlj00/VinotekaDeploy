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
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "BusinessUsers", key: "user_id" },
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
        type: Sequelize.FLOAT,
      },
      bottleSize: {
        allowNull: false,
        type: Sequelize.FLOAT,
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
        type: Sequelize.FLOAT,
      },
      numReviews: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      alcoholPercentage: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      vineyards: {
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
