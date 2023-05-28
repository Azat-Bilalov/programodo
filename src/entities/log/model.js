import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from "@/shared/config";

const BASE_URL = '/api/logs';

export const logModel = createApi({
    reducerPath: 'logApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getLogs: builder.query({
            query: () => `${BASE_URL}`,
            providesTags: (result, error, arg) => [{ type: 'Log', id: 'ALL' }]
        }),
        getLog: builder.query({
            query: (id) => `${BASE_URL}/${id}`,
            providesTags: (result, error, {id}) => [{ type: 'Log', id }]
        }),
        addLog: builder.mutation({
            query: (body) => ({
                url: `${BASE_URL}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Log', id: 'ALL' }]
        }),
        updateLog: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `${BASE_URL}/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Log', id }],
        }),
        deleteLog: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Log', id: 'ALL' }],
        }),
    }),
});
