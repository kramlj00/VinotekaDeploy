const { error } = require("../utils/error");
const { getProductById } = require("../repo/product");

const isOutOfStock = async (ctx, next) => {
  console.log("dvishihbierh", ctx.request.body);

  await Promise.all(
    ctx.request.body.orderItems.map(async (item) => {
      const product = await getProductById(item.product);
      if (product.countInStock - product.qty < 0) {
        throw error("vinoteka_service.out_of_stock");
      }
    })
  );

  await next();
};

module.exports = { isOutOfStock };
