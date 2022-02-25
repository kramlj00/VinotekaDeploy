const Koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const indexRoute = require("./routes/index");
const json = require("koa-json");

const app = new Koa();
const router = new koaRouter();

app.use(json());
app.use(bodyParser());

// setting the router middleware

router.use(indexRoute.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(5000, () => console.log("Server started..."));
