import { ADD_TO_CART, GET_CART_LIST, REMOVE_FROM_CART } from "../actions/types";

export const addToCart = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existingItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};

export const cartList = (state = { cart: {} }, action) => {
  switch (action.type) {
    case GET_CART_LIST:
      return { cart: action.payload };
    default:
      return state;
  }
};
