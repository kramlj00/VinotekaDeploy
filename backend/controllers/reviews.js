const { Reviews, Product } = require("../db/models/index");
const { error } = require("../utils/error");

const saveReview = async (ctx) => {
  try {
    const productId = ctx.params.product_id;
    const userId = ctx.state.user.id;

    const product = await Product.findByPk(productId);
    if (product) {
      product.numReviews += 1;
      if (product.rating)
        product.rating = (product.rating + ctx.request.body.rating) / 2;
      else product.rating = ctx.request.body.rating;

      await product.save();
    } else throw error("vinoteka_service.product_not_found");
    const review = await new Reviews({
      user_id: userId,
      product_id: productId,
      author: ctx.state.user.name,
      comment: ctx.request.body.comment,
      rating: ctx.request.body.rating,
    });
    await review.save();
    ctx.body = "Vaša recenzija je spremljena!";
  } catch (error) {
    console.log(error);
  }
};

module.exports = { saveReview };
