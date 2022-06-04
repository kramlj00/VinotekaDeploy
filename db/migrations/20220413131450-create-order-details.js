"use strict";

//20220413131450
//20220413141914

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      order_prices_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "OrderPrices", key: "id" },
      },
      shipping_address_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "ShippingAddresses", key: "id" },
      },
      payment_method: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      is_paid: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      paid_at: {
        type: Sequelize.DATE,
      },
      is_delivered: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      delivered_at: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("OrderDetails");
  },
};
