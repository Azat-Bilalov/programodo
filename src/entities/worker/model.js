import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from "@/shared/config";

const BASE_URL = '/api/workers';

export const workerModel = createApi({
    reducerPath: 'workerApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getWorkers: builder.query({
            query: () => `${BASE_URL}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Worker', id })), { type: 'Worker', id: 'LIST' }]
                    : [{ type: 'Worker', id: 'LIST' }],
        }),
        getWorker: builder.query({ // add caching
            query: (id) => `${BASE_URL}/${id}`,
            providesTags: (result, error, id) => [{ type: 'Worker', id }],
        }),
        getWorkerLogs: builder.query({
            query: (id) => `${BASE_URL}/${id}/logs`,
            providesTags: (result, error, id) => [{ type: 'Log', id }],
        }),
        addWorker: builder.mutation({
            query: (body) => ({
                url: `${BASE_URL}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Worker', id: 'LIST' }],
        }),
        updateWorker: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `${BASE_URL}/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Worker', id }],
        }),
        deleteWorker: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Worker', id }],
        }),
    }),
});
