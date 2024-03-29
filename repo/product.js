const { Product, Reviews } = require("../db/models/index");
const Sequelize = require("sequelize");
const { Op } = require("@sequelize/core");
const { parseToArray } = require("../utils/formatters");

const getProducts = async function (ctx) {
  try {
    if (ctx.query.priceFilter) {
      const priceFilter = await parseToArray(ctx.query.priceFilter, false);
      return await Product.findAll({
        where: {
          price: {
            [Op.between]: [priceFilter[0], priceFilter[1]],
          },
        },
      });
    } else {
      return await Product.findAll();
    }
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async function (id) {
  try {
    return await Product.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const getReviewsByProductId = async function (productId) {
  try {
    return await Reviews.findAll({
      where: {
        product_id: productId,
      },
      order: [["createdAt", "DESC"]],
    });
  } catch (error) {
    console.log(error);
  }
};

const getFilteredProducts = async function (ctx) {
  try {
    const filterArray = await parseToArray(ctx.query.filterArray, false);
    const priceFilter = await parseToArray(ctx.query.priceFilter, false);

    return await Product.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                category: filterArray,
              },
              {
                sort: filterArray,
              },
            ],
            price: {
              [Op.between]: [priceFilter[0], priceFilter[1]],
            },
          },
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const saveProduct = async function (product) {
  try {
    return await product.save();
  } catch (error) {
    throw error;
  }
};

const getAllCategories = async function () {
  try {
    return Product.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("category")), "category"],
      ],
      order: [["category", "ASC"]],
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllSorts = async function () {
  try {
    return Product.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("sort")), "sort"]],
      order: [["sort", "ASC"]],
    });
  } catch (error) {
    console.log(error);
  }
};

const getMinPrice = async function () {
  try {
    return Product.min("price");
  } catch (error) {
    console.log(error);
  }
};

const getMaxPrice = async function () {
  try {
    return await Product.max("price");
  } catch (error) {
    console.log(error);
  }
};

const getOrderedProducts = async function (ctx) {
  try {
    const sortOption = await parseToArray(ctx.query.sortOption, false);
    if (ctx.query.priceFilter) {
      const priceFilter = await parseToArray(ctx.query.priceFilter, false);
      return await Product.findAll({
        where: {
          price: {
            [Op.between]: [priceFilter[0], priceFilter[1]],
          },
        },
        order: [[sortOption[0], sortOption[1]]],
      });
    } else {
      return await Product.findAll({
        order: [[sortOption[0], sortOption[1]]],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProductsWithExceededQty = async (cartItems) => {
  return await Promise.all(
    cartItems.map(async (item) => {
      const product = await getProductById(item.product);
      if (product.countInStock - item.qty < 0) {
        return product;
      }
    })
  );
};

const getOrderedFilteredProducts = async function (ctx) {
  try {
    const filterArray = await parseToArray(ctx.query.filterArray, false);
    const priceFilter = await parseToArray(ctx.query.priceFilter, false);
    const sortOption = await parseToArray(ctx.query.sortOption, false);

    return await Product.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                category: filterArray,
              },
              {
                sort: filterArray,
              },
            ],
            price: {
              [Op.between]: [priceFilter[0], priceFilter[1]],
            },
          },
        ],
      },
      order: [[sortOption[0], sortOption[1]]],
    });
  } catch (error) {
    console.log(error);
  }
};

const getMineProducts = async function (ctx) {
  try {
    const userId = ctx.state.user.id;

    return await Product.findAll({
      where: {
        seller_id: userId,
      },
      order: [["createdAt", "DESC"]],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
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
};
