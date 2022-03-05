const { getUser, saveUser } = require("../repo/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils");
const { User, BusinessUser } = require("../db/models/index");

const userSignIn = async (ctx) => {
  const user = await getUser(ctx.request.body.email);

  if (user) {
    if (bcrypt.compareSync(ctx.request.body.password, user.password)) {
      ctx.body = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      };
      return;
    }
  }
  ctx.throw(401, "Unauthorized", {
    message: '{"message": "Invalid email or password"}',
  });
};

const userRegister = async (ctx) => {
  try {
    const user = await new User({
      type_id: ctx.request.body.type_id,
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: bcrypt.hashSync(ctx.request.body.password, 8),
    });
    const userInDb = await getUser(user.email);
    if (userInDb) {
      ctx.body = { message: `User with email ${user.email} already exists!` };
    } else {
      await saveUser(user);
      ctx.body = {
        id: user.id,
        type_id: user.type_id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      };
    }
    if (ctx.request.body.opg_name) {
      const businessUser = await new BusinessUser({
        user_id: user.id,
        opg_name: ctx.request.opg_name,
        oib: ctx.request.oib,
        street: ctx.request.street,
        house_number: ctx.request.house_number,
        city: ctx.request.city,
        zip: ctx.request.zip,
        county: ctx.request.county,
        phone_number: ctx.request.phone_number,
      });
      await saveBusinessUser(businessUser);
      ctx.body = {
        businessUser,
        token: generateToken(user),
      };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userSignIn, userRegister };
