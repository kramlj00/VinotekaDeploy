"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sort: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      seller: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      countInStock: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      bottleSize: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      product: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      qty: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("OrderItems");
  },
};
