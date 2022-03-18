const productRouter = new (require("koa-router"))();
const {
  allProducts,
  productById,
  addProduct,
  filterProducts
} = require("../controllers/products");

productRouter.get("/wines", allProducts);

productRouter.post("/wines", filterProducts);

productRouter.get("/wines/:id", productById);

productRouter.post("/wine/add", addProduct);

module.exports = { productRouter };
