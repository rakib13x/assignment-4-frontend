// src/redux/features/Products/orderApi.ts

import { baseApi } from "../../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      { clientSecret: string },
      { amount: number }
    >({
      query: (data) => ({
        url: `/payment/create-payment-intent`,
        method: "POST",
        body: data,
      }),
    }),
    confirmPayment: builder.mutation<any, { paymentIntentId: string }>({
      query: (data) => ({
        url: `/payment/confirm-payment`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useConfirmPaymentMutation } =
  orderApi;
