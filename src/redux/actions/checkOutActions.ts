export const CREATE_PAYMENT_REQUEST = "CREATE_PAYMENT_REQUEST";
export const CREATE_PAYMENT_SUCCESS = "CREATE_PAYMENT_SUCCESS";
export const CREATE_PAYMENT_FAILURE = "CREATE_PAYMENT_FAILURE";

export const createPaymentRequest = () => ({
  type: CREATE_PAYMENT_REQUEST,
});

export const createPaymentSuccess = (data) => ({
  type: CREATE_PAYMENT_SUCCESS,
  payload: data,
});

export const createPaymentFailure = (error) => ({
  type: CREATE_PAYMENT_FAILURE,
  payload: error,
});
