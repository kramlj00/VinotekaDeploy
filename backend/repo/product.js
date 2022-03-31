const { Product } = require("../db/models/index");
const Sequelize = require("sequelize");
const { Op } = require('@sequelize/core');

const getProducts = async function () {
  try {
    return await Product.findAll();
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async function (id) {
  try {
    return await Product.findByPk(id);
  } catch (error) {
    console.log(error);
  }
};

const getFilteredProducts = async function (ctx) {
  const { filterArray } = ctx.request.body;
  console.log(filterArray);
  try {
    return await Product.findAll({
      where: {
        [Op.or]: [
          {
            category: filterArray
          },
          {
            sort: filterArray
          },
        ]
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
    console.log(error);
  }
};

const getAllCategories = async function () {
  try {
    return Product.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("category")), "category",],
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllSorts = async function () {
  try {
    return Product.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("sort")), "sort",]
      ],
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
  getAllSorts
};
