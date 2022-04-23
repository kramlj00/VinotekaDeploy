import Axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
} from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  order.paymentMethod = localStorage.getItem("paymentMethod");
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  console.log(order);

  try {
    // const {
    //   userSignIn: { userInfo },
    // } = getState();
    console.log(order);

    const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await Axios.post("/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("paymentMethod");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const userInfo = await JSON.parse(localStorage.getItem("userInfo"));

    const { data } = await Axios.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const listOrderMine = () => async (dispatch) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
  try {
    const { data } = await Axios.get(`/orders_mine`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
  const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
  try {
    const { data } = await Axios.delete(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};
