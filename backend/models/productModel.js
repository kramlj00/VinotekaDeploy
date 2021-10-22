import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    bottleSize: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    sort: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    numReviews: {
      type: Number,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
