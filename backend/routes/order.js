const { saveOrders, getOrder } = require("../controllers/orders");
const { isAuth } = require("../middleware/auth");
const orderRouter = new (require("koa-router"))();

orderRouter.post("/orders", isAuth, saveOrders);

orderRouter.get("/orders/:id", isAuth, getOrder);

module.exports = { orderRouter };
