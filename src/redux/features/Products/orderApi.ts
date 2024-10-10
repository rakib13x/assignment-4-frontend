import { baseApi } from "../../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      { clientSecret: string },
      { amount: number; products: { productId: string; quantity: number }[] }
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
    createCodOrder: builder.mutation<
      any,
      {
        user: any;
        products: { productId: string; quantity: number; price: number }[];
      }
    >({
      query: (data) => ({
        url: `/payment/cod-order`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
  useCreateCodOrderMutation,
} = orderApi;
