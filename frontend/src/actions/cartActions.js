import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  // send ajax request to server to get data based on productId
  const { data } = await Axios.get(`/wines/${productId}`);

  console.log(data.product);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      category: data.product.category,
      sort: data.product.sort,
      image: data.product.image,
      seller: data.product.seller,
      countInStock: data.product.countInStock,
      price: data.product.price,
      bottleSize: data.product.bottleSize,
      product: data.product._id,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
