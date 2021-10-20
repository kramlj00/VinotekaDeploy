import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  // send ajax request to server to get data based on productId
  const { data } = await Axios.get(`/api/wines/${productId}`);

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
      product: data._id,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
