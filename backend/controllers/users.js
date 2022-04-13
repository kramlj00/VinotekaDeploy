const {
  getUser,
  saveUser,
  saveBusinessUser,
  getBusinessUser,
} = require("../repo/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils");
const { User, BusinessUser } = require("../db/models/index");

const userSignIn = async (ctx) => {
  const user = await getUser(ctx.request.body.email);

  if (user) {
    if (bcrypt.compareSync(ctx.request.body.password, user.password)) {
      ctx.body = {
        id: user.id,
        type_id: user.type_id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      };
      console.log(generateToken(user));
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

    await saveUser(user);

    if (user.type_id === 2) {
      const businessUser = await new BusinessUser({
        user_id: user.id,
        opg_name: ctx.request.body.opg_name,
        oib: ctx.request.body.oib,
        street: ctx.request.body.street,
        house_number: ctx.request.body.house_number,
        city: ctx.request.body.city,
        zip: ctx.request.body.zip,
        county: ctx.request.body.county,
        phone_number: ctx.request.body.phone_number,
      });
      await saveBusinessUser(businessUser);
    }

    ctx.body = {
      id: user.id,
      type_id: user.type_id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userSignIn, userRegister };
