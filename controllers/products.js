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
  getOrderedFilteredProducts,
  getMineProducts,
  getReviewsByProductId,
  getProductsWithExceededQty,
} = require("../repo/product");
const { Product, Reviews } = require("../db/models/index");
const { error } = require("../utils/error");

const cloudinary = require("cloudinary").v2;
const { getPublicId } = require("../utils/getPublicId");
const {
  notifyUserOnAddCreation,
} = require("../services/email/notifyUserOnAddCreation");

// Change cloud name, API Key, and API Secret below

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allProducts = async (ctx) => {
  let products = [];
  if (ctx.query.sortOption.length) products = await getOrderedProducts(ctx);
  else products = await getProducts(ctx);
  ctx.body = products;
};

const checkExceededQty = async (ctx) => {
  const cartProducts = ctx.request.body;
  const exceededQtyProducts = await getProductsWithExceededQty(cartProducts);
  // const productList = cartProducts.map(cartProduct => {
  //   const productWithExceededQty = isExceededQty(cartProduct);
  //   if (productWithExceededQty) {
  //     return [{...cartProduct, exceededQty: true }];
  //   }
  //   return cartProduct;
  // })

  ctx.body = exceededQtyProducts;
};

const productById = async (ctx) => {
  const product = await getProductById(ctx.params.id);
  if (product) {
    const reviews = await getReviewsByProductId(ctx.params.id);
    product.dataValues.reviews = reviews;
    ctx.body = product;
  } else throw error("vinoteka_service.product_not_found");
};

const filterProducts = async (ctx) => {
  let products = [];
  if (ctx.query.sortOption.length)
    products = await getOrderedFilteredProducts(ctx);
  else products = await getFilteredProducts(ctx);
  ctx.body = products;
};

const addProduct = async (ctx) => {
  try {
    const product = await new Product({
      seller_id: ctx.request.body.seller_id,
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
    if (result) {
      ctx.body = "Uspješno ste oglasili proizvod!";
      notifyUserOnAddCreation(ctx.state.user.email);
    }
  } catch (error) {
    throw error;
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

const mineProducts = async (ctx) => {
  if (ctx.state.user.type_id === 2) {
    const products = await getMineProducts(ctx);
    ctx.body = products;
  } else throw error("vinoteka_service.forbidden");
};

const updateProduct = async (ctx) => {
  try {
    const productId = ctx.params.wine_id;
    const product = await Product.findByPk(productId);
    if (product) {
      const imagePublicId = await getPublicId(product.image);

      cloudinary.uploader.destroy(imagePublicId, function (result) {
        console.log(result);
      });

      product.alcoholPercentage =
        ctx.request.body.alcoholPercentage || product.alcoholPercentage;
      product.sort = ctx.request.body.sort || product.sort;
      product.category = ctx.request.body.category || product.category;
      product.bottleSize = ctx.request.body.bottleSize || product.bottleSize;
      product.countInStock =
        ctx.request.body.countInStock || product.countInStock;
      product.year = ctx.request.body.year || product.year;
      product.vineyards = ctx.request.body.vineyards || product.vineyards;
      product.description = ctx.request.body.description || product.description;
      product.price = ctx.request.body.price || product.price;
      product.image = ctx.request.body.image || product.image;

      const updateProduct = await product.save();
      const message = "Proizvod uspješno ažuriran!";
      ctx.body = { message, updateProduct };
    } else throw error("vinoteka_service.product_not_found");
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (ctx) => {
  try {
    const product = await Product.findByPk(ctx.params.wine_id);
    if (product) {
      const imagePublicId = await getPublicId(product.image);

      cloudinary.uploader.destroy(imagePublicId, function (result) {
        console.log(result);
      });

      await Reviews.destroy({
        where: {
          product_id: product.id,
        },
      });
      await product.destroy();
      ctx.body = "Oglas uspješno obrisan!";
    } else throw error("vinoteka_service.product_not_found");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  allProducts,
  productById,
  addProduct,
  filterProducts,
  allCategories,
  priceRange,
  mineProducts,
  updateProduct,
  deleteProduct,
  checkExceededQty,
};
