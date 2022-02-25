const { getProducts } = require("../repo/product");

const allProducts = async (ctx) => {
  const products = await getProducts();
  ctx.body = { products };
};

module.exports = { allProducts };
