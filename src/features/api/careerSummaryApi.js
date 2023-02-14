import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const careerSummaryApi = createApi({ 
    reducerPath: 'careerSummaryApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/career-summary`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Summary'],
    endpoints: (builder) => ({
        getSummaries: builder.query({
            query: (userId) => `/all/${userId}`,
            providesTags: ['Summary']
        }),
        getSummary: builder.query({
            query: (userId) => `/${userId}`,
            invalidatesTags: ['Summary']
        }),
        addSummary: builder.mutation({
            query: (data) => ({
                url: '',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Summary']
        }),
        editSummary: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['Summary']
        }),
        deleteSummary: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Summary']
        })
    })
})

export const {
    useGetSummaryQuery,
    useGetSummariesQuery,
    useAddSummaryMutation,
    useDeleteSummaryMutation,
    useEditSummaryMutation
} = careerSummaryApi;