import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://example.com/api" }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (productId) => ({
        url: `/cart/add/${productId}`,
        method: "POST",
      }),
    }),
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/cart/remove/${productId}`,
        method: "POST",
      }),
    }),
    getCart: builder.query({
      query: () => "/cart",
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartQuery,
} = cartApi;
