import Axios from "axios";
import {
  ADD_TO_CART,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  GET_CART_LIST,
  REMOVE_FROM_CART,
} from "./types";

export const addToCart = (id, qty) => (dispatch, getState) => {
  Axios.get(`/api/products/${id}`)
    .then((res) => {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          name: res.data.name,
          image: res.data.image,
          countInStock: res.data.countInStock,
          price: res.data.price,
          product: res.data._id,
          qty,
        },
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const cartList = () => (dispatch) => {
  dispatch({
    type: GET_CART_LIST,
    payload: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    },
  });
};

export const removeCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch, getState) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
