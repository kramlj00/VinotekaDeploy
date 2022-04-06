const userRouter = new (require("koa-router"))();
const { userSignIn, userRegister } = require("../controllers/users");
const { validate } = require("../middleware/validate");
const { checkIfUserExists } = require("../middleware/checkIfUserExists");
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
    opg_name: joi.when('type_id', {
      is: 2,
      then: joi.string().required(),
      otherwise: { not: joi.exist() },
    }),
    oib: joi.when('type_id', {
      is: 2,
      then: joi.string().min(13).max(13).required(),
      otherwise: { not: joi.exist() },
    }),
    street: joi.when('type_id', {
      is: 2,
      then: joi.string().min(3).required(),
      otherwise: { not: joi.exist() },
    }),
    house_number: joi.when('type_id', {
      is: 2,
      then: joi.number().integer().required(),
      otherwise: { not: joi.exist() },
    }),
    city: joi.when('type_id', {
      is: 2,
      then: joi.string().min(3).required(),
      otherwise: { not: joi.exist() },
    }),
    zip: joi.when('type_id', {
      is: 2,
      then: joi.number().integer().required(),
      otherwise: { not: joi.exist() },
    }),
    county: joi.when('type_id', {
      is: 2,
      then: joi.string().min(3).required(),
      otherwise: { not: joi.exist() },
    }),
    phone_number: joi.when('type_id', {
      is: 2,
      then: joi.string().min(3).required(),
      otherwise: { not: joi.exist() },
    }),
  }),
  checkIfUserExists,
  userRegister
);

module.exports = { userRouter };
