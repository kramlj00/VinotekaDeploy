import { axiosInstance } from "../config";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  // send ajax request to server to get data based on productId
  const { data } = await axiosInstance.get(`/wines/${productId}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      category: data.category,
      sort: data.sort,
      image: data.image,
      seller: data.seller,
      countInStock: data.countInStock,
      price: data.price,
      bottleSize: data.bottleSize,
      product: data.id,
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

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
