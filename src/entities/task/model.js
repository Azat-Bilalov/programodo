import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from "@/shared/config";

const BASE_URL = '/api/tasks';

export const taskModel = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => `${BASE_URL}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Task', id })), { type: 'Task', id: 'LIST' }]
                    : [{ type: 'Task', id: 'LIST' }],
        }),
        getTask: builder.query({ // add caching
            query: (id) => `${BASE_URL}/${id}`,
            providesTags: (result, error, id) => [{ type: 'Task', id }],
        }),
        getTaskLogs: builder.query({
            query: (id) => `${BASE_URL}/${id}/logs`,
            providesTags: (result, error, id) => [{ type: 'Log', id }],
        }),
        addTask: builder.mutation({
            query: (body) => ({
                url: `${BASE_URL}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Task', id: 'LIST' }],
        }),
        addTaskLog: builder.mutation({
            query: ({ task, ...body }) => ({
                url: `${BASE_URL}/${task}/logs`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { task }) => [{ type: 'Log', id: task }],
        }),
        updateTask: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `${BASE_URL}/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Task', id }],
        }),
    }),
});
