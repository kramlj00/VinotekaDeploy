const { getUser } = require("../repo/user");
const { error } = require("../utils/error");

const checkIfUserExists = async (ctx, next) => {
  const { email } = ctx.request.body;

  const userAlreadyExists = await getUser(email);

  if (userAlreadyExists) throw error("vinoteka_service.user_already_exists");

  await next();
};

module.exports = { checkIfUserExists };
