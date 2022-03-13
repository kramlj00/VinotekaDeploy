const { Product } = require("../db/models/index");

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

const saveProduct = async function (product) {
  try {
    return await product.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getProducts, getProductById, saveProduct };
