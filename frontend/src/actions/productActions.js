import { axiosInstance } from "../config";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_MINE_LIST_REQUEST,
  PRODUCT_MINE_LIST_SUCCESS,
  PRODUCT_MINE_LIST_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";

export const listProducts =
  (searchText="", priceFilter="", sortOption="") => async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await axiosInstance.get(
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
      const { data } = await axiosInstance.get(
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
    const { data } = await axiosInstance.get(`/wines/${productId}`);
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
    image,
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
      const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axiosInstance.post(
        "/wine/add",
        {
          seller_id: userInfo.id,
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
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
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

export const listProductMine = () => async (dispatch) => {
  dispatch({ type: PRODUCT_MINE_LIST_REQUEST });
  const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
  try {
    const { data } = await axiosInstance.get(`/wines_mine`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PRODUCT_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_MINE_LIST_FAIL, payload: message });
  }
};

export const updateProduct = (product) => async (dispatch) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
  try {
    const { data } = await axiosInstance.put(`/wine/edit/${product.id}`, product, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: message });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
  try {
    const { data } = await axiosInstance.delete(`/wine/${productId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};
