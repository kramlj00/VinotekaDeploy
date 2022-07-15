const { error } = require("../utils/error");
const { Product } = require("../db/models/index");

const checkIfUserIsSeller = async (ctx, next) => {
  const userId = ctx.state.user.id;
  const productId = ctx.params.wine_id;

  const product = await Product.findByPk(productId);
  if (userId !== 1 && product.seller_id !== userId) {
    throw error("vinoteka_service.forbidden");
  }

  await next();
};

module.exports = { checkIfUserIsSeller };
