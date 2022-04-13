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
      items_price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      shipping_price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      tax_price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      total_price: {
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
