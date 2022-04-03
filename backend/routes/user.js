const userRouter = new (require("koa-router"))();
const { userSignIn, userRegister } = require("../controllers/users");
const { validate } = require("../middleware/validate");
const joi = require("joi");

userRouter.post(
  "/users/signin",
  validate.body({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
  userSignIn
);

userRouter.post(
  "/users/register",
  validate.body({
    type_id: joi.number().required(),
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),
  userRegister
);

module.exports = { userRouter };
