const { User } = require("../db/models/index");

const getUser = async function (email) {
  try {
    return await User.findOne({
        where: {
            email: email
        }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser };