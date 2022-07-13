import { axiosInstance } from "../config";
import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
} from "../constants/reviewConstants";

export const createReview = (review, productId) => async (dispatch) => {
  dispatch({ type: REVIEW_CREATE_REQUEST });
  try {
    const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axiosInstance.post(`/review/${productId}`, review, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: REVIEW_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
