const { error } = require("../utils/error");

const isBusinessUser = async (ctx, next) => {
  const userType = ctx.state.user.type_id;
  if (userType !== 2) {
    throw error("vinoteka_service.forbidden");
  }

  await next();
};

module.exports = { isBusinessUser };
