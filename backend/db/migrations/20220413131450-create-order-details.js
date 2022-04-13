"use strict";
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
      product: {
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
      payment_method_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "PaymentMethods", key: "id" },
      },
      is_paid: {
        type: Sequelize.BOOLEAN,
      },
      paid_at: {
        type: Sequelize.DATE,
      },
      is_delivered: {
        type: Sequelize.BOOLEAN,
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
