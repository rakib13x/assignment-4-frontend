import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ category, minPrice, maxPrice, sortOrder }) => {
        let url = `/allProducts?`;
        if (category) url += `category=${category}&`;
        if (minPrice) url += `minPrice=${minPrice}&`;
        if (maxPrice) url += `maxPrice=${maxPrice}&`;
        if (sortOrder) url += `sortOrder=${sortOrder}&`;
        return { url, method: "GET" };
      },
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productsApi;
