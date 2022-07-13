require("dotenv").config();
const Koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const { productRouter } = require("./routes/product");
const { userRouter } = require("./routes/user");
const { orderRouter } = require("./routes/order");
const { reviewRouter } = require("./routes/review");
const json = require("koa-json");
const static = require('koa-static')
const path = require('path')
const fs = require('fs')

const app = new Koa();
const router = new koaRouter();

app.use(json());
app.use(bodyParser());
app.use(static(path.resolve('build')))

// setting the router middleware

router.use(productRouter.routes());
router.use(userRouter.routes());
router.use(orderRouter.routes());
router.use(reviewRouter.routes());
app.use(router.routes()).use(router.allowedMethods());
router.get("/config/paypal", (ctx) => {
  ctx.body = process.env.PAYPAL_CLIENT_ID || "sb"; // sb = sandbox
});

router.get('(.*)', (ctx) => {
  fs.readFileSync(path.resolve(path.join('build', 'index.html')), 'utf8')
})

module.exports = app;
