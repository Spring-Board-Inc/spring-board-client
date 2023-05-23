import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const faqApi = createApi({ 
    reducerPath: 'faqApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/faq`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Faq'],
    endpoints: (builder) => ({
        getFaqs: builder.query({
            query: ({ pageNumber, searchTerm }) => `?PageNumber=${pageNumber}&SearchBy=${searchTerm}`,
            providesTags: ['Faq']
        }),
        getFaq: builder.query({
            query: (id) => `${id}`,
            providesTags: ['Faq']
        }),
        addFaq: builder.mutation({
            query: ({ formData }) => ({
                url: ``,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Faq']
        }),
        editFaq: builder.mutation({
            query: ({ id, formData }) => ({
                url: `${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['Faq']
        }),
        deleteFaq: builder.mutation({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Faq']
        })
    })
})

export const {
    useGetFaqsQuery,
    useAddFaqMutation,
    useDeleteFaqMutation,
    useEditFaqMutation,
    useGetFaqQuery
} = faqApi;