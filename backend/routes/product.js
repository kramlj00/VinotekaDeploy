const productRouter = new (require("koa-router"))();
const {
  allProducts,
  productById,
  addProduct,
  filterProducts,
  filterProductsByPrice,
  allCategories
} = require("../controllers/products");

productRouter.get("/wines", allProducts);

productRouter.get("/wines_filter", filterProducts);

productRouter.get("/wines/price_filter", filterProductsByPrice);

productRouter.get("/wines/:id", productById);

productRouter.post("/wine/add", addProduct);

productRouter.get("/all_categories", allCategories);

module.exports = { productRouter };
