const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  console.log("USER::::::", user);
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "kristina",
    {
      expiresIn: "30d",
    }
  );
};

module.exports = { generateToken };
