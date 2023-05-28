import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from "@/shared/config";

const BASE_URL = '/api/products';

export const productModel = createApi({
    reducerPath: 'productModel',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Products', 'ProductProjects', 'ProductClients', 'ProductComments'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `${BASE_URL}`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), { type: 'Products', id: 'LIST' }]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        getProduct: builder.query({
            query: (id) => `${BASE_URL}/${id}`,
            providesTags: (result, error, arg) => [{ type: 'Products', id: arg }],
        }),
        getProductProjects: builder.query({
            query: (id) => `${BASE_URL}/${id}/projects`,
            providesTags: (result, error, arg) => [{ type: 'ProductProjects', id: arg }],
        }),
        getProductClients: builder.query({
            query: (id) => `${BASE_URL}/${id}/clients`,
            providesTags: (result, error, arg) => [{ type: 'ProductClients', id: arg }],
        }),
        getProductComments: builder.query({
            query: (id) => `${BASE_URL}/${id}/comments`,
            providesTags: (result, error, arg) => [{ type: 'ProductComments', id: arg }],
        }),
        createProduct: builder.mutation({
            query: (body) => ({
                url: `${BASE_URL}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Products', id: 'LIST' }],
        }),
        createProductProject: builder.mutation({
            query: ({ product, ...body }) => ({
                url: `${BASE_URL}/${product}/projects`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { product }) => [{ type: 'ProductProjects', id: product }],
        }),
        createProductComment: builder.mutation({
            query: ({ product, ...body }) => ({
                url: `${BASE_URL}/${product}/comments`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { product }) => [{ type: 'ProductComments', id: product }],
        }),
        addClient: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `${BASE_URL}/${id}/addClient`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'ProductClients', id }],
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `${BASE_URL}/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});
