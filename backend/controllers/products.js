const {
  getProducts,
  getProductById,
  saveProduct,
  getFilteredProducts,
  getAllCategories,
  getAllSorts,
  getMinPrice,
  getMaxPrice,
  getOrderedProducts,
  getOrderedFilteredProducts
} = require("../repo/product");
const { Product } = require("../db/models/index");

const allProducts = async (ctx) => {
  let products = [];
  if(ctx.query.sortOption.length) products = await getOrderedProducts(ctx);
  else products = await getProducts(ctx);
  ctx.body = products;
};

const productById = async (ctx) => {
  const product = await getProductById(ctx.params.id);
  ctx.body = product;
};

const filterProducts = async (ctx) => {
  let products = [];
  if(ctx.query.sortOption.length) products = await getOrderedFilteredProducts(ctx);
  else products = await getFilteredProducts(ctx);
  ctx.body = products;
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

const allCategories = async (ctx) => {
  const sortsData = await getAllSorts();
  const categoriesData = await getAllCategories();

  sortsData.push(...categoriesData);

  ctx.body = sortsData;
};

const priceRange = async (ctx) => {
  const minPrice = await getMinPrice();
  const maxPrice = await getMaxPrice();

  ctx.body = {
    min: minPrice,
    max: maxPrice,
  };
};

module.exports = {
  allProducts,
  productById,
  addProduct,
  filterProducts,
  allCategories,
  priceRange,
};
