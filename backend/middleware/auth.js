const jwt = require("jsonwebtoken");
const { error } = require("../utils/error");

const isAuth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  if (authorization) {
    // Choose the token part of the string and remove the beginning with optional whitespace
    const token = authorization?.split(/Bearer\s?/)[1];
    // const token = authorization.slice(7, authorization.length);
    // decode contains data inside of the token
    jwt.verify(token, process.env.JWT_SECRET || "kristina", (err, decode) => {
      if (err) throw error("user.invalid_token");
      else {
        console.log("decodeeeeeeeeeeee: ", decode);
        ctx.state.user = decode; // decode is info about user
        // next(); // we pass user as propery of ctx.request to the next middleware
      }
    });
  } else {
    if (err) throw error("user.no_token");
  }
  await next();
};

module.exports = { isAuth };
