const productRouter = new (require("koa-router"))();
const { allProducts, productById } = require("../controllers/products");

productRouter.get("/", allProducts);

productRouter.get("/:id", productById);

module.exports = { productRouter };
