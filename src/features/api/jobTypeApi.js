import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const jobTypeApi = createApi({ 
    reducerPath: 'jobTypeApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/jobtype`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['JobType'],
    endpoints: (builder) => ({
        getJobTypes: builder.query({
            query: () => ``,
            providesTags: ['JobType']
        }),
        getJobType: builder.query({
            query: (id) => `/${id}`,
            invalidatesTags: ['JobType']
        }),
        addJobType: builder.mutation({
            query: (data) => ({
                url: ``,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['JobType']
        }),
        editJobType: builder.mutation({
            query: ({ id, formData}) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['JobType']
        }),
        deleteJobType: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['JobType']
        })
    })
})

export const {
    useAddJobTypeMutation,
    useDeleteJobTypeMutation,
    useEditJobTypeMutation,
    useGetJobTypeQuery,
    useGetJobTypesQuery
} = jobTypeApi;