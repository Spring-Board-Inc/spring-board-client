import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const jobApi = createApi({ 
    reducerPath: 'jobApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Job', 'Stats'],
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: () => `/job`,
            providesTags: ['Job']
        }),
        getJobStats: builder.query({
            query: () => `/job/stats`,
            providesTags: ['Stats']
        }),
        getJob: builder.query({
            query: (id) => `/job/${id}`
        })
    })
})

export const {
    useGetJobsQuery,
    useGetJobQuery,
    useGetJobStatsQuery
} = jobApi;