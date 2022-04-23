const { Op } = require("@sequelize/core");
const { OrderDetails, OrderItems } = require("../db/models/index");
const { error } = require("../utils/error");

const canUserPostReview = async (ctx, next) => {
  const userId = ctx.state.user.id;
  const productId = ctx.params.product_id;
  const orderDetails = await OrderDetails.findAll({
    where: {
      user_id: userId,
    },
  });
  if (orderDetails) {
    const orderIds = orderDetails.map((order) => {
      return order.id;
    });
    const orderItems = await OrderItems.findOne({
      where: {
        [Op.and]: [{ order_id: orderIds, product: productId }],
      },
    });
    if (orderItems) ctx.body = true;
    else {
      ctx.body = false;
      throw error("vinoteka_service.forbidden");
    }
  } else throw error("vinoteka_service.order_not_found");

  await next();
};

module.exports = { canUserPostReview };
