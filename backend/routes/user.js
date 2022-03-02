const userRouter = new (require("koa-router"))();
const { userSignIn } = require("../controllers/users");

userRouter.post('/users/signin', userSignIn);

module.exports = { userRouter };