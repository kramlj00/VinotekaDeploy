"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PaymentResults", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      payment_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "OrderDetails", key: "id" },
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      update_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      email_address: {
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
    await queryInterface.dropTable("PaymentResults");
  },
};
