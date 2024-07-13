// src/redux/reducer/checkoutReducer.ts

import {
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
} from "../actions/checkOutActions";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case CREATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
