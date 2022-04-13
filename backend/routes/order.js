const { saveOrders } = require("../controllers/orders");
const { isAuth } = require("../middleware/auth");
const orderRouter = new (require("koa-router"))();

orderRouter.post("/orders", isAuth, saveOrders);

module.exports = { orderRouter };
