// export const productDetails = (id) => (dispatch) => {
//   dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: id });
//   Axios.get(`/api/products/${id}`)
//     .then((res) => {
//       dispatch({ type: PRODUCT_DETAILS_REQUEST_SUCCESS, payload: res.data });
//     })
//     .catch((err) => {
//       dispatch({
//         type: PRODUCT_DETAILS_REQUEST_FAIL,
//         payload:
//   err.response && err.response.data.message
//     ? err.response.data.message
//     : err.message,
//       });
//     });
// };

import Axios from "axios";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_REQUEST_FAIL,
  USER_SIGN_IN_REQUEST_SUCCESS,
  USER_SIGN_OUT,
} from "./types";

export const signin = (email, password) => (dispatch) => {
  dispatch({ type: USER_SIGN_IN_REQUEST, payload: { email, password } });
  Axios.post("/api/users/signin", { email, password })
    .then((res) => {
      dispatch({ type: USER_SIGN_IN_REQUEST_SUCCESS, payload: res.data });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    })
    .catch((err) => {
      dispatch({
        type: USER_SIGN_IN_REQUEST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_SIGN_OUT });
};

export const register = (name, email, password) => (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  Axios.post("/api/users/register", { name, email, password })
    .then((res) => {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
      dispatch({ type: USER_SIGN_IN_REQUEST_SUCCESS, payload: res.data });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    })
    .catch((err) => {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};
