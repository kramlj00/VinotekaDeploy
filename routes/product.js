const productRouter = new (require("koa-router"))();
const {
  allProducts,
  productById,
  addProduct,
  filterProducts,
  allCategories,
  priceRange,
  mineProducts,
  updateProduct,
  deleteProduct,
  checkExceededQty
} = require("../controllers/products");
const { validate } = require("../middleware/validate");
const joi = require("joi");
const { isAuth } = require("../middleware/auth");
const { checkIfUserIsSeller } = require("../middleware/checkIfUserIsSeller");
const { isBusinessUser } = require("../middleware/isBusinessUser");

productRouter.get("/wines", allProducts);

productRouter.post("/wines/exceeded_qty", checkExceededQty);

productRouter.get(
  "/wines_filter",
  validate.query({
    filterArray: joi.string(),
    priceFilter: joi.string(),
    sortOption: joi.string().allow(null).allow(""),
  }),
  filterProducts
);

productRouter.get(
  "/wines/:id",
  validate.param({
    id: joi.number().integer().optional(),
  }),
  productById
);

productRouter.get("/wines_mine", isAuth, mineProducts);

productRouter.post(
  "/wine/add",
  validate.body({
    seller_id: joi.number().integer().required(),
    category: joi.string().min(3).required(),
    image: joi.optional(),
    price: joi.number().min(1).required(),
    bottleSize: joi.number().required(),
    sort: joi.string().min(3).required(),
    seller: joi.string().min(3).required(),
    description: joi.string().min(3).required(),
    year: joi.number().min(1).required(),
    alcoholPercentage: joi.number().min(1).required(),
    vineyards: joi.string().min(3).required(),
    countInStock: joi.number().min(1).required(),
  }),
  isAuth,
  isBusinessUser,
  addProduct
);

productRouter.delete(
  "/wine/:wine_id",
  isAuth,
  checkIfUserIsSeller,
  deleteProduct
);

productRouter.put(
  "/wine/edit/:wine_id",
  isAuth,
  checkIfUserIsSeller,
  updateProduct
);

productRouter.get("/all_categories", allCategories);

productRouter.get("/price_range", priceRange);

module.exports = { productRouter };
