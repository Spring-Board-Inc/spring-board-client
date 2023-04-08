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
    tagTypes: ['Job'],
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: ({ pageNumber, searchTerm }) => `/job?PageNumber=${pageNumber}&SearchBy=${searchTerm}`,
            providesTags: ['Job']
        }),
        getJobStats: builder.query({
            query: () => `/job/stats`,
            providesTags: ['Job']
        }),
        getJob: builder.query({
            query: (id) => `/job/${id}`
        }),
        getRawJob: builder.query({
            query: (id) => `/job/raw/${id}`
        }),
        apply: builder.mutation({
            query: (data) => ({
                url: `/job/apply/${data.id}`,
                method: 'POST',
                body: data.cvToUpload,
            }),
            invalidatesTags: ['Job']
        }),
        addJob: builder.mutation({
            query: (data) => ({
                url: '/job',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Job']
        }),
        editJob: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/job/${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['Job']
        }),
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/job/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Job']
        }),
        getJobApplicants: builder.query({
            query: (id) => `job/${id}/applicants`,
            invalidatesTags: ['Job']
        }),
        getCompanyJobs: builder.query({
            query: ({ pageNumber, id, searchTerm }) => `/job/company-jobs/${id}?PageNumber=${pageNumber}&SearchBy=${searchTerm}`
        })
    })
})

export const {
    useGetJobsQuery,
    useGetJobQuery,
    useGetJobStatsQuery,
    useApplyMutation,
    useAddJobMutation,
    useEditJobMutation,
    useGetRawJobQuery,
    useDeleteJobMutation,
    useGetJobApplicantsQuery,
    useGetCompanyJobsQuery
} = jobApi;