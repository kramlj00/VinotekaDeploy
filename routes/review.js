const { saveReview } = require("../controllers/reviews");
const { isAuth } = require("../middleware/auth");
const { canUserPostReview } = require("../middleware/canUserPostReview");
const reviewRouter = new (require("koa-router"))();

reviewRouter.get("/review/is_allowed/:product_id", isAuth, canUserPostReview);

reviewRouter.post("/review/:product_id", isAuth, canUserPostReview, saveReview);

module.exports = { reviewRouter };
