import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from "@/shared/config";

const BASE_URL = '/api/projects';

export const projectModel = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => `${BASE_URL}`,
            providesTags: (result, error, arg) => [{ type: 'Project', id: 'ALL' }]
        }),
        getProject: builder.query({
            query: (id) => `${BASE_URL}/${id}`,
            providesTags: (result, error, {id}) => [{ type: 'Project', id }]
        }),
        getProjectTasks: builder.query({
            query: (id) => `${BASE_URL}/${id}/tasks`,
            providesTags: (result, error, {id}) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'ProjectTasks', id })), { type: 'ProjectTasks', id: 'LIST' }]
                    : [{ type: 'ProjectTasks', id: 'LIST' }],
        }),
        getProjectTeams: builder.query({
            query: (id) => `${BASE_URL}/${id}/teams`,
            providesTags: (result, error, {id}) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'ProjectTeams', id })), { type: 'ProjectTeams', id: 'LIST' }]
                    : [{ type: 'ProjectTeams', id: 'LIST' }],
        }),
        addProject: builder.mutation({
            query: (body) => ({
                url: `${BASE_URL}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Project', id: 'ALL' }]
        }),
        updateProject: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `${BASE_URL}/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }],
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Project', id: 'ALL' }],
        }),
    }),
});
