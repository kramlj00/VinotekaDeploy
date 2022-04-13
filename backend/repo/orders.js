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

module.exports = {
  saveOrderPrices,
  saveShippingAddress,
  saveOrderDetails,
  saveOrderItems,
};
