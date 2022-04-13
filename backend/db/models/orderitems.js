"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItems.init(
    {
      order_id: DataTypes.INTEGER,
      category: DataTypes.STRING,
      sort: DataTypes.STRING,
      image: DataTypes.STRING,
      seller: DataTypes.STRING,
      countInStock: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      bottleSize: DataTypes.FLOAT,
      product: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderItems",
    }
  );
  return OrderItems;
};
