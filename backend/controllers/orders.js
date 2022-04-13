const {
  ShippingAddress,
  OrderPrice,
  OrderDetails,
  OrderItems,
} = require("../db/models/index");
const {
  saveOrderPrices,
  saveShippingAddress,
  saveOrderDetails,
  saveOrderItems,
} = require("../repo/orders");

const saveOrders = async (ctx) => {
  try {
    console.log("IDDDDDDDDDDDDDDDDD: ", ctx.state.user.id);
    if (ctx.request.body.orderItems.length === 0) {
      ctx.body = "Košarica je prazna";
    } else {
      const orderPrices = await new OrderPrice({
        itemsPrice: ctx.request.body.itemsPrice,
        shippingPrice: ctx.request.body.shippingPrice,
        taxPrice: ctx.request.body.taxPrice,
        totalPrice: ctx.request.body.totalPrice,
      });
      const createdOrderPrices = await saveOrderPrices(orderPrices);

      const shippingAddress = await new ShippingAddress(
        ctx.request.body.shippingAddress
      );
      const createdShippingAddress = await saveShippingAddress(shippingAddress);

      const orderDetails = new OrderDetails({
        user_id: ctx.state.user.id,
        order_prices_id: orderPrices.id,
        shipping_address_id: shippingAddress.id,
        payment_method: ctx.request.body.paymentMethod,
      });
      const createdOrderDetails = await saveOrderDetails(orderDetails);

      const createdOrderItems = await Promise.all(
        ctx.request.body.orderItems.map(async (item) => {
          return await saveOrderItems(
            new OrderItems({
              order_id: createdOrderDetails.id,
              category: item.category,
              sort: item.sort,
              image: item.image,
              seller: item.seller,
              countInStock: item.countInStock,
              price: item.price,
              bottleSize: item.bottleSize,
              product: item.product,
              qty: item.qty,
            })
          );
        })
      );

      if (
        (createdOrderPrices,
        createdShippingAddress,
        createdOrderDetails,
        createdOrderItems)
      ) {
        return (ctx.response.body = {
          message: "Narudžba uspješno završena",
          id: createdOrderItems[0].order_id,
          createdOrderPrices,
          createdShippingAddress,
          createdOrderDetails,
          createdOrderItems,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { saveOrders };
