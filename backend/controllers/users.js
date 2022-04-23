const {
  getUser,
  getBusinessUser,
  saveUser,
  saveBusinessUser,
} = require("../repo/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/utils");
const {
  User,
  BusinessUser,
  OrderDetails,
  OrderItems,
} = require("../db/models/index");
const { error } = require("../utils/error");
const { Op } = require("@sequelize/core");

const canUserComment = async (ctx) => {
  const userId = ctx.state.user.id;
  const productId = ctx.params.product_id;
  const orderDetails = await OrderDetails.findAll({
    where: {
      user_id: userId,
    },
  });
  if (orderDetails) {
    const orderIds = orderDetails.map((order) => {
      return order.id;
    });
    const orderItems = await OrderItems.findOne({
      where: {
        [Op.and]: [{ order_id: orderIds, product: productId }],
      },
    });
    if (orderItems) ctx.body = true;
    else ctx.body = false;
  } else throw error("vinoteka_service.order_not_found");
};

const userSignIn = async (ctx) => {
  const user = await getUser(ctx.request.body.email);

  if (user) {
    if (bcrypt.compareSync(ctx.request.body.password, user.password)) {
      ctx.body = {
        id: user.id,
        type_id: user.type_id,
        name: user.name,
        email: user.email,
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
      type_id: ctx.request.body.type_id,
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: bcrypt.hashSync(ctx.request.body.password, 8),
    });

    await saveUser(user);

    if (user.type_id === 2) {
      const businessUser = await new BusinessUser({
        user_id: user.id,
        opg_name: ctx.request.body.opg_name,
        oib: ctx.request.body.oib,
        street: ctx.request.body.street,
        house_number: ctx.request.body.house_number,
        city: ctx.request.body.city,
        zip: ctx.request.body.zip,
        county: ctx.request.body.county,
        phone_number: ctx.request.body.phone_number,
      });
      await saveBusinessUser(businessUser);
    }

    ctx.body = {
      id: user.id,
      type_id: user.type_id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    };
  } catch (error) {
    console.log(error);
  }
};

const getBusinessUserInfo = async (ctx) => {
  try {
    const user = await getBusinessUser(ctx.state.user.id);
    if (user) ctx.body = user;
    else throw error("user.not_found");
  } catch (error) {
    console.log(error);
  }
};

const updateRegularProfile = async (ctx) => {
  try {
    const user = await User.findByPk(ctx.state.user.id);
    if (user) {
      user.name = ctx.request.body.name || user.name;
      user.email = ctx.request.body.email || user.email;
      if (ctx.request.body.password) {
        user.password = bcrypt.hashSync(ctx.request.body.password, 8);
      }
      const updatedUser = await user.save();
      ctx.body = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        type_id: updatedUser.type_id,
        token: generateToken(updatedUser),
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const updateBusinessProfile = async (ctx) => {
  try {
    const user = await BusinessUser.findByPk(ctx.state.user.id);
    if (user) {
      user.opg_name = ctx.request.body.opgName || user.opg_name;
      user.oib = ctx.request.body.oib || user.oib;
      user.street = ctx.request.body.street || user.street;
      user.house_number = ctx.request.body.houseNumber || user.house_number;
      user.city = ctx.request.body.city || user.city;
      user.zip = ctx.request.body.zip || user.zip;
      user.county = ctx.request.body.county || user.county;
      user.phone_number = ctx.request.body.phoneNumber || user.phone_number;
      if (ctx.request.body.password) {
        user.password = bcrypt.hashSync(ctx.request.body.password, 8);
      }
      const updatedUser = await user.save();
      ctx.body = updatedUser;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userSignIn,
  userRegister,
  getBusinessUserInfo,
  updateRegularProfile,
  updateBusinessProfile,
  canUserComment,
};
