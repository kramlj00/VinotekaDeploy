import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL
} from "../constants/productConstants";

export const listProducts =
  (searchText, priceFilter, sortOption) => async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/wines?priceFilter=${priceFilter}&sortOption=${sortOption}`
      );
      if (!searchText) dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
      else {
        const filteredProducts = await data.filter((product) => {
          return JSON.stringify(product)
            .toLowerCase()
            .includes(searchText.toLowerCase());
        });
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: filteredProducts });
      }
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const filterProducts =
  (filterArray, priceFilter, sortOption) => async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/wines_filter?filterArray=${filterArray}&priceFilter=${priceFilter}&sortOption=${sortOption}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/wines/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewProduct =
  (
    category,
    image = "",
    price,
    bottleSize,
    sort,
    seller,
    description,
    year,
    alcoholPercentage,
    vineyards,
    countInStock
  ) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_ADD_REQUEST,
      payload: {
        category,
        image,
        price,
        bottleSize,
        sort,
        seller,
        description,
        year,
        alcoholPercentage,
        vineyards,
        countInStock,
      },
    });
    try {
      const { data } = await Axios.post("/wine/add", {
        category,
        image,
        price,
        bottleSize,
        sort,
        seller,
        description,
        year,
        alcoholPercentage,
        vineyards,
        countInStock,
      });
      dispatch({
        type: PRODUCT_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
