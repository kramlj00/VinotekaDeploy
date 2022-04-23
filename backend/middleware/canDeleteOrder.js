const { error } = require("../utils/error");
const { OrderDetails } = require("../db/models/index");

const canDeleteOrder = async (ctx, next) => {
  const userId = ctx.state.user.id;
  const orderId = ctx.params.order_id;

  const order = await OrderDetails.findByPk(orderId);
  if (order.user_id !== userId) {
    throw error("vinoteka_service.forbidden");
  }

  await next();
};

module.exports = { canDeleteOrder };
