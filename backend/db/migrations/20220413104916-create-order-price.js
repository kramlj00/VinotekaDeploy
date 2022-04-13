"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderPrices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemsPrice: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      shippingPrice: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      taxPrice: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("OrderPrices");
  },
};
