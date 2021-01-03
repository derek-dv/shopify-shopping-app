import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_REQUEST_FAIL,
  PRODUCT_DETAILS_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_FAIL,
  PRODUCT_LIST_REQUEST_SUCCESS,
} from "../actions/types";

export const products = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_REQUEST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const init = {
  product: {
    id: 999999,
    name: "",
    category: "",
    image: "",
    countInStock: 999999,
  },
  loading: true,
};
export const productDetails = (state = init, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_REQUEST_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_REQUEST_FAIL:
      return { product: init.product, loading: false, error: action.payload };
    default:
      return state;
  }
};
