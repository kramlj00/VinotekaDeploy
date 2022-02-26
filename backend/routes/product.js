const productRouter = new (require("koa-router"))();
const { allProducts, productById } = require("../controllers/products");

productRouter.get("/wines", allProducts);

productRouter.get("/wines/:id", productById);

module.exports = { productRouter };
