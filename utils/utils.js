const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      type_id: user.type_id,
    },
    process.env.JWT_SECRET || "kristina",
    {
      expiresIn: "30d",
    }
  );
};

module.exports = { generateToken };
