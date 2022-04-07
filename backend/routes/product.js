const productRouter = new (require("koa-router"))();
const {
  allProducts,
  productById,
  addProduct,
  filterProducts,
  allCategories,
  priceRange,
} = require("../controllers/products");
const { validate } = require("../middleware/validate");
const joi = require("joi");

productRouter.get("/wines", allProducts);

productRouter.get("/wines_filter", 
  validate.query({
    filterArray: joi.string(),
    priceFilter: joi.string(),
    sortOption: joi.string().allow(null).allow(''),
  }),
  filterProducts
);

productRouter.get("/wines/:id", 
  validate.param({
    id: joi.number().integer().optional()
  }),
  productById
);

productRouter.post(
  "/wine/add",
  validate.body({
    category: joi.string().min(4).required(),
    image: joi.optional(),
    price: joi.number().min(1).required(),
    bottleSize: joi.number().required(),
    sort: joi.string().min(3).required(),
    seller: joi.string().min(3).required(),
    description: joi.string().min(4).required(),
    year: joi.number().min(1).required(),
    alcoholPercentage: joi.number().min(1).required(),
    vineyards: joi.string().min(3).required(),
    countInStock: joi.number().min(1).required(),
  }),
  addProduct
);

productRouter.get("/all_categories", allCategories);

productRouter.get("/price_range", priceRange);

module.exports = { productRouter };
