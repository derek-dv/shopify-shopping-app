import Axios from "axios";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_REQUEST_FAIL,
  PRODUCT_DETAILS_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_FAIL,
  PRODUCT_LIST_REQUEST_SUCCESS,
} from "./types";

export const listProduct = () => (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  Axios.get("/api/products")
    .then((res) => {
      dispatch({ type: PRODUCT_LIST_REQUEST_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_LIST_REQUEST_FAIL, payload: err.message });
    });
};

export const productDetails = (id) => (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: id });
  Axios.get(`/api/products/${id}`)
    .then((res) => {
      dispatch({ type: PRODUCT_DETAILS_REQUEST_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};
