const jwt = require("jsonwebtoken");
const { error } = require("../utils/error");

const isAuth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  if (authorization) {
    // Choose the token part of the string and remove the beginning with optional whitespace
    const token = authorization?.split(/Bearer\s?/)[1];
    // decode contains data inside of the token
    jwt.verify(token, process.env.JWT_SECRET || "kristina", (err, decode) => {
      if (err) throw error("user.invalid_token");
      else {
        ctx.state.user = decode;
      }
    });
  } else {
    if (err) throw error("user.no_token");
  }
  // pass user as propery of ctx.state to the next middleware
  await next();
};

module.exports = { isAuth };
