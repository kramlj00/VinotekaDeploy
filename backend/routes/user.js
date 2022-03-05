const userRouter = new (require("koa-router"))();
const { userSignIn, userRegister } = require("../controllers/users");

userRouter.post("/users/signin", userSignIn);

userRouter.post("/users/register", userRegister);

module.exports = { userRouter };
