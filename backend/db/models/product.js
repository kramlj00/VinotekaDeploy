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
      price: DataTypes.FLOAT,
      bottleSize: DataTypes.FLOAT,
      countInStock: DataTypes.INTEGER,
      sort: DataTypes.STRING,
      seller: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      numReviews: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      alcoholPercentage: DataTypes.FLOAT,
      description: DataTypes.STRING,
      vineyards: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
