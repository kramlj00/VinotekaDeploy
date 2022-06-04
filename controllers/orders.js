const {
  ShippingAddress,
  OrderPrice,
  OrderDetails,
  OrderItems,
  PaymentResults,
} = require("../db/models/index");
const {
  saveOrderPrices,
  saveShippingAddress,
  saveOrderDetails,
  saveOrderItems,
  getOrderDetailsById,
  getOrderItemsById,
  getOrderPricesById,
  getShippingAddressById,
  getPaymentResultsById,
} = require("../repo/orders");
const { getProductById } = require("../repo/product");
const { error } = require("../utils/error");
const {
  notifyUserOnOrderCreation,
} = require("../services/email/notifyUserOnOrderCreation");

const saveOrders = async (ctx) => {
  try {
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
        is_paid: true,
        paid_at: Date.now(),
      });
      const createdOrderDetails = await saveOrderDetails(orderDetails);

      const createdOrderItems = await Promise.all(
        ctx.request.body.orderItems.map(async (item) => {
          const product = await getProductById(item.product);
          if (product) {
            product.countInStock -= item.qty;
            product.bottlesSold += item.qty;
            if (product.countInStock < 0)
              throw error("vinoteka_service.bad_request");
            await product.save();
          } else throw error("vinoteka_service.product_not_found");

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

      const paymentResults = new PaymentResults({
        payment_id: ctx.request.body.paymentResult.id,
        order_id: orderDetails.id,
        status: ctx.request.body.paymentResult.status,
        update_time: ctx.request.body.paymentResult.update_time,
        email_address: ctx.request.body.paymentResult.payer.email_address,
      });
      const updatedPaymentResults = await paymentResults.save();

      if (
        (createdOrderPrices,
        createdShippingAddress,
        createdOrderDetails,
        createdOrderItems)
      ) {
        notifyUserOnOrderCreation(
          createdOrderDetails,
          createdShippingAddress,
          ctx.state.user,
          createdOrderPrices
        );
        return (ctx.response.body = {
          message: "Narudžba uspješno završena",
          id: createdOrderItems[0].order_id,
          createdOrderPrices,
          createdShippingAddress,
          createdOrderDetails,
          createdOrderItems,
          updatedPaymentResults,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrder = async (ctx) => {
  const orderDetails = await getOrderDetailsById(ctx.params.id);
  if (orderDetails) {
    const orderItems = await getOrderItemsById(ctx.params.id);
    const orderPrices = await getOrderPricesById(orderDetails.order_prices_id);
    const orderShippingAddress = await getShippingAddressById(
      orderDetails.shipping_address_id
    );

    ctx.body = {
      orderDetails,
      orderItems,
      orderPrices,
      orderShippingAddress,
    };
  } else {
    ctx.body = { message: "Narudžba nije pronađena" };
  }
};

const getMineOrders = async (ctx) => {
  const orderDetails = await OrderDetails.findAll({
    where: {
      user_id: ctx.state.user.id,
    },
    order: [["createdAt", "DESC"]],
  });

  ctx.body = orderDetails;
};

const deleteOrder = async (ctx) => {
  const orderId = ctx.params.order_id;
  try {
    const orderDetails = await getOrderDetailsById(orderId);
    if (orderDetails) {
      const paymentResults = await getPaymentResultsById(orderId);
      const orderPrices = await getOrderPricesById(
        orderDetails.order_prices_id
      );
      const shippingAddress = await getShippingAddressById(
        orderDetails.shipping_address_id
      );

      await paymentResults.destroy();
      await orderDetails.destroy();
      await orderPrices.destroy();
      await shippingAddress.destroy();
      await OrderItems.destroy({
        where: {
          id: orderId,
        },
      });

      ctx.body = "Narudžba uspješno obrisana!";
    } else throw error("vinoteka_service.product_not_found");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { saveOrders, getOrder, getMineOrders, deleteOrder };
