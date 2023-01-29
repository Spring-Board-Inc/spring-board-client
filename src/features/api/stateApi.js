import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const stateApi = createApi({ 
    reducerPath: 'stateApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/location/state`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['State'],
    endpoints: (builder) => ({
        getStates: builder.query({
            query: (queryString) => queryString,
            providesTags: ['State']
        }),
        getState: builder.query({
            query: (id) => `/${id}`,
            invalidatesTags: ['State']
        }),
        addState: builder.mutation({
            query: (data) => ({
                url: '',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['State']
        }),
        editState: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['State']
        }),
        deleteState: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['State']
        })
    })
})

export const {
    useAddStateMutation,
    useDeleteStateMutation,
    useEditStateMutation,
    useGetStatesQuery,
    useGetStateQuery 
} = stateApi;