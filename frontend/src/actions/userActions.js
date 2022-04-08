import Axios from "axios";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
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
    console.log(error);
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
