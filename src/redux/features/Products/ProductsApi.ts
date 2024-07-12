import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/allProducts",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
