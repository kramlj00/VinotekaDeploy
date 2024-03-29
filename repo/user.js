const { User, BusinessUser } = require("../db/models/index");

const getUser = async function (email) {
  try {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getBusinessUser = async function (user_id) {
  try {
    return await BusinessUser.findOne({
      where: {
        user_id: user_id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const saveUser = async function (user) {
  try {
    return await user.save();
  } catch (error) {
    console.log(error);
  }
};

const saveBusinessUser = async function (businessuser) {
  try {
    return await businessuser.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, getBusinessUser, saveUser, saveBusinessUser };
