const router = new (require("koa-router"))();

router.get("/", async (ctx) => (ctx.body = "Hello from index endpoint!"));

module.exports = router;
