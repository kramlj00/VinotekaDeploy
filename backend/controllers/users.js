const { getUser, saveUser } = require("../repo/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils");
const { User } = require("../db/models/index");

const userSignIn = async (ctx) => {
  const user = await getUser(ctx.request.body.email);

  if (user) {
    if (bcrypt.compareSync(ctx.request.body.password, user.password)) {
      ctx.body = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
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
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: bcrypt.hashSync(ctx.request.body.password, 8),
      isAdmin: ctx.request.body.isAdmin,
    });
    const userInDb = await getUser(user.email);
    if (userInDb) {
      ctx.body = { message: `User with email ${user.email} already exists!` };
    } else {
      await saveUser(user);
      ctx.body = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userSignIn, userRegister };
