import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_REQUEST_FAIL,
  USER_SIGN_IN_REQUEST_SUCCESS,
  USER_SIGN_OUT,
} from "../actions/types";

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const signinReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGN_IN_REQUEST:
      return { loading: true };
    case USER_SIGN_IN_REQUEST_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGN_IN_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGN_OUT:
      return { userInfo: {} };
    default:
      return state;
  }
};
