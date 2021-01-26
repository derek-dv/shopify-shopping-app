import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productDetails, products } from "./reducers/productReducers.js";
import { addToCart } from "./reducers/cartReducers";
import { registerReducer, signinReducer } from "./reducers/userReducer.js";

const initialState = {
  signin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ?  JSON.parse(localStorage.getItem("shippingAddress"))
      :  {},
    paymentMethod: "Paypal"
  },
};

const reducer = combineReducers({
  products,
  productDetails,
  cart: addToCart,
  signin: signinReducer,
  register: registerReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
