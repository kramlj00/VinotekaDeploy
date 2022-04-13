require("dotenv").config();
const Koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const { productRouter } = require("./routes/product");
const { userRouter } = require("./routes/user");
const { orderRouter } = require("./routes/order");
const json = require("koa-json");

const app = new Koa();
const router = new koaRouter();

app.use(json());
app.use(bodyParser());

// setting the router middleware

router.use(productRouter.routes());
router.use(userRouter.routes());
router.use(orderRouter.routes());

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
