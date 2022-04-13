'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderPrice.init({
    items_price: DataTypes.FLOAT,
    shipping_price: DataTypes.FLOAT,
    tax_price: DataTypes.FLOAT,
    total_price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'OrderPrice',
  });
  return OrderPrice;
};