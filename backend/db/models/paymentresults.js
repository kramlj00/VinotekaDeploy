"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentResults extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentResults.init(
    {
      payment_id: DataTypes.STRING,
      order_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      update_time: DataTypes.DATE,
      email_address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaymentResults",
    }
  );
  return PaymentResults;
};
