const productRouter = new (require("koa-router"))();
const { allProducts } = require("../controllers/products");

productRouter.get("/", allProducts);

module.exports = { productRouter };
