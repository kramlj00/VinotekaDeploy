"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      category: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      bottleSize: DataTypes.INTEGER,
      countInStock: DataTypes.INTEGER,
      sort: DataTypes.STRING,
      seller: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      numReviews: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
