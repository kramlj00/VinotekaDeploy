const { getProducts, getProductById, saveProduct, getFilteredProducts} = require("../repo/product");
const { Product } = require("../db/models/index");

const allProducts = async (ctx) => {
  const products = await getProducts();
  ctx.body = products;
};

const productById = async (ctx) => {
  const product = await getProductById(ctx.params.id);
  ctx.body = product;
};

const filterProducts = async (ctx) => {
  const product = await getFilteredProducts(ctx);
  ctx.body = product;
};

const addProduct = async (ctx) => {
  try {
    const product = await new Product({
      category: ctx.request.body.category,
      image: ctx.request.body.image,
      price: ctx.request.body.price,
      bottleSize: ctx.request.body.bottleSize,
      sort: ctx.request.body.sort,
      seller: ctx.request.body.seller,
      description: ctx.request.body.description,
      year: ctx.request.body.year,
      alcoholPercentage: ctx.request.body.alcoholPercentage,
      vineyards: ctx.request.body.vineyards,
      countInStock: ctx.request.body.countInStock,
      numReviews: 0,
    });
    const result = await saveProduct(product);
    if (result) ctx.body = product;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { allProducts, productById, addProduct, filterProducts };
