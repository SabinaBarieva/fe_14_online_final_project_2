import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => 'products',
    }),
    getProduct: build.query({
      query: (itemNo) => `products/${itemNo}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
