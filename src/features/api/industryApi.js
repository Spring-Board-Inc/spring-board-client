import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const industryApi = createApi({ 
    reducerPath: 'industryApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/industry`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Industry'],
    endpoints: (builder) => ({
        getIndustries: builder.query({
            query: ({ pageNumber, searchTerm }) => `?PageNumber=${pageNumber}&SearchBy=${searchTerm}`,
            providesTags: ['Industry']
        }),
        getIndustriesNoPaging: builder.query({
            query: () => `/all`,
            providesTags: ['Industry']
        }),
        getIndustry: builder.query({
            query: (id) => `/${id}`,
            invalidatesTags: ['Industry']
        }),
        addIndustry: builder.mutation({
            query: (data) => ({
                url: ``,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Industry']
        }),
        editIndustry: builder.mutation({
            query: ({ id, formData}) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['Industry']
        }),
        deleteIndustry: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Industry']
        })
    })
})

export const {
    useAddIndustryMutation,
    useDeleteIndustryMutation,
    useEditIndustryMutation,
    useGetIndustryQuery,
    useGetIndustriesQuery,
    useGetIndustriesNoPagingQuery
} = industryApi;