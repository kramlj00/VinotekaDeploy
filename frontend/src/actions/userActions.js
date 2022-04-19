import Axios from "axios";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/users/signin", { email, password });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: { data },
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: "Invalid email or password",
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_SIGNOUT });
  document.location.href = "/";
};

export const regularRegister = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/users/register", {
      name,
      email,
      password,
      type_id: 3,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: { data },
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: { data },
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: "Email mora biti validan",
      // error.response && error.response.data.message
      //   ? error.response.data.message
      //   : error.message,
    });
  }
};

export const businessRegister =
  (
    name,
    email,
    password,
    opg_name,
    oib,
    street,
    house_number,
    city,
    zip,
    county,
    phone_number
  ) =>
  async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: {
        name,
        email,
        password,
        opg_name,
        oib,
        street,
        house_number,
        city,
        zip,
        county,
        phone_number,
      },
    });
    try {
      const { data } = await Axios.post("/users/register", {
        name,
        email,
        password,
        opg_name,
        oib,
        street,
        house_number,
        city,
        zip,
        county,
        phone_number,
        type_id: 2,
      });
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: { data },
      });
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: { data },
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: "Email mora biti validan",
        // error.response && error.response.data.message
        //   ? error.response.data.message
        //   : error.message,
      });
    }
  };

export const updateUserProfile = (user) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
  try {
    const { data } = await Axios.put(`/users/regular_profile`, user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};
