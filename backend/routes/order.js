const {
  saveOrders,
  deleteOrder,
  getOrder,
  getMineOrders,
} = require("../controllers/orders");
const { isAuth } = require("../middleware/auth");
const { canDeleteOrder } = require("../middleware/canDeleteOrder");
const { isOutOfStock } = require("../middleware/isOutOfStock");
const orderRouter = new (require("koa-router"))();

orderRouter.post("/orders", isAuth, isOutOfStock, saveOrders);

orderRouter.get("/orders/:id", isAuth, getOrder);

orderRouter.delete("/orders/:order_id", isAuth, canDeleteOrder, deleteOrder);

orderRouter.get("/orders_mine", isAuth, getMineOrders);

module.exports = { orderRouter };
