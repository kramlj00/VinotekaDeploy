"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BusinessUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BusinessUser.init(
    {
      opg_name: DataTypes.STRING,
      oib: DataTypes.BIGINT(13),
      street: DataTypes.STRING,
      house_number: DataTypes.NUMBER,
      city: DataTypes.STRING,
      zip: DataTypes.NUMBER,
      county: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BusinessUser",
    }
  );

  return BusinessUser;
};
