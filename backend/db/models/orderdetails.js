"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderDetails.init(
    {
      user_id: DataTypes.INTEGER,
      product: DataTypes.INTEGER,
      order_prices_id: DataTypes.INTEGER,
      shipping_address_id: DataTypes.INTEGER,
      payment_method_id: DataTypes.INTEGER,
      is_paid: DataTypes.BOOLEAN,
      paid_at: DataTypes.DATE,
      is_delivered: DataTypes.BOOLEAN,
      delivered_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "OrderDetails",
    }
  );
  return OrderDetails;
};
