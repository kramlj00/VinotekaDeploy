import Axios from "axios";
import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
} from "../constants/reviewConstants";

export const createReview = (review, productId) => async (dispatch) => {
  dispatch({ type: REVIEW_CREATE_REQUEST });
  try {
    console.log(review);
    const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await Axios.post(`/review/${productId}`, review, {
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
