const {
  OrderDetails,
  OrderItems,
  OrderPrice,
  ShippingAddress,
} = require("../db/models/index");

const saveOrderPrices = async function (orderPrices) {
  try {
    return await orderPrices.save();
  } catch (error) {
    console.log(error);
  }
};

const saveShippingAddress = async function (shippingAddress) {
  try {
    return await shippingAddress.save();
  } catch (error) {
    console.log(error);
  }
};

const saveOrderDetails = async function (orderDetails) {
  try {
    return await orderDetails.save();
  } catch (error) {
    console.log(error);
  }
};

const saveOrderItems = async function (orderItems) {
  try {
    return await orderItems.save();
  } catch (error) {
    console.log(error);
  }
};

const getOrderDetailsById = async function (orderId) {
  try {
    return await OrderDetails.findByPk(orderId);
  } catch (error) {
    console.log(error);
  }
};

const getOrderItemsById = async function (orderId) {
  try {
    return await OrderItems.findAll({
      where: {
        order_id: orderId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrderPricesById = async function (orderPricesId) {
  try {
    return await OrderPrice.findByPk(orderPricesId);
  } catch (error) {
    console.log(error);
  }
};

const getShippingAddressById = async function (shippingAddressId) {
  try {
    return await ShippingAddress.findByPk(shippingAddressId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveOrderPrices,
  saveShippingAddress,
  saveOrderDetails,
  saveOrderItems,
  getOrderDetailsById,
  getOrderItemsById,
  getOrderPricesById,
  getShippingAddressById,
};
