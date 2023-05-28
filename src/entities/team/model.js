import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from "@/shared/config";

const BASE_URL = '/api/teams';

export const teamModel = createApi({
    reducerPath: 'teamApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: () => `${BASE_URL}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Team', id })), { type: 'Team', id: 'LIST' }]
                    : [{ type: 'Team', id: 'LIST' }],
        }),
        getTeamWorkers: builder.query({
            query: (id) => `${BASE_URL}/${id}/workers`,
            providesTags: (result, error, id) => [{ type: 'TeamWorkers', id }],
        }),
        getWorkersWithoutTeam: builder.query({
            query: () => `${BASE_URL}/no-team/workers`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'noTeamWorkers', id })), { type: 'noTeamWorkers', id: 'LIST' }]
                    : [{ type: 'noTeamWorkers', id: 'LIST' }],
        }),
        addTeam: builder.mutation({
            query: (body) => ({
                url: `${BASE_URL}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Team'],
        }),
        addWorkerToTeam: builder.mutation({
            query: ({ teamId, workerId }) => ({
                url: `${BASE_URL}/${teamId}/workers/${workerId}`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, { teamId }) => [{ type: 'TeamWorkers', id: teamId }, { type: 'noTeamWorkers', id: 'LIST' }],
        }),
        updateTeam: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `${BASE_URL}/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Team'],
        }),
        deleteTeam: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) =>
                [{ type: 'noTeamWorkers', id: 'LIST' }, { type: 'Team', id }, { type: 'TeamWorkers', id }],
        }),
        deleteWorkerFromTeam: builder.mutation({
            query: ({ teamId, workerId }) => ({
                url: `${BASE_URL}/${teamId}/workers/${workerId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { teamId }) =>
                [{ type: 'TeamWorkers', id: teamId }, { type: 'noTeamWorkers', id: 'LIST' }],
        }),
    }),
});
