const { getProducts, getProductById } = require("../repo/product");

const allProducts = async (ctx) => {
  const products = await getProducts();
  ctx.body = products;
};

const productById = async (ctx) => {
  const product = await getProductById(ctx.params.id);
  ctx.body = product;
};

module.exports = { allProducts, productById };
