const productRouter = new (require("koa-router"))();
const {
  allProducts,
  productById,
  addProduct,
  filterProducts,
  allCategories
} = require("../controllers/products");

productRouter.get("/wines", allProducts);

productRouter.post("/wines", filterProducts);

productRouter.get("/wines/:id", productById);

productRouter.post("/wine/add", addProduct);

productRouter.get("/all_categories", allCategories);

module.exports = { productRouter };
