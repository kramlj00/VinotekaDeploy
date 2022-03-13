const productRouter = new (require("koa-router"))();
const {
  allProducts,
  productById,
  addProduct,
} = require("../controllers/products");

productRouter.get("/wines", allProducts);

productRouter.get("/wines/:id", productById);

productRouter.post("/wine/add", addProduct);

module.exports = { productRouter };
