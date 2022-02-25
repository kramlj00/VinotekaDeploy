const { Product } = require("../db/models/index");

const getProducts = function () {
  return Product.findAll();
};

module.exports = { getProducts };
