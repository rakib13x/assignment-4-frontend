//@ts-nocheck
import { Product } from "../../../types/types";
import { baseApi } from "../../api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], ProductQueryParams>({
      query: ({ category, minPrice, maxPrice, sortOrder }) => {
        let url = `/allProducts?`;
        if (category) url += `category=${encodeURIComponent(category)}&`;
        if (minPrice) url += `minPrice=${minPrice}&`;
        if (maxPrice) url += `maxPrice=${maxPrice}&`;
        if (sortOrder) url += `sortOrder=${sortOrder}&`;
        return { url, method: "GET" };
      },
      transformResponse: (response: { success: boolean; data: Product[] }) =>
        response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: `/create-product`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),
    // Add Best Selling Products API here
    getBestSellingProducts: builder.query<Product[], void>({
      query: () => ({
        url: `/best-selling`,
        method: "GET",
      }),
      // Handle response and transform it if needed
      transformResponse: (response: { success: boolean; data: Product[] }) =>
        response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map((product) => ({
                type: "Products" as const,
                id: product._id || "UNKNOWN_PRODUCT_ID", // Handle undefined id
              })),
              { type: "Products", id: "BEST_SELLING" },
            ]
          : [{ type: "Products", id: "BEST_SELLING" }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetBestSellingProductsQuery, // Export the new hook for best-selling products
} = productsApi;
