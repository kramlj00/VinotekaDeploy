const { saveOrders, getOrder, updateIsPaid } = require("../controllers/orders");
const { isAuth } = require("../middleware/auth");
const orderRouter = new (require("koa-router"))();

orderRouter.post("/orders", isAuth, saveOrders);

orderRouter.get("/orders/:id", isAuth, getOrder);

orderRouter.put("/orders/:id/pay", isAuth, updateIsPaid);

module.exports = { orderRouter };
