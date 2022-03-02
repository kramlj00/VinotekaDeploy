const { getUser } = require("../repo/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils");

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
  ctx.body = {"message": "Invalid email or password"};
};

module.exports = { userSignIn };
