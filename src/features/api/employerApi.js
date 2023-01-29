import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const employerApi = createApi({ 
    reducerPath: 'employerApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/company`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Employer'],
    endpoints: (builder) => ({
        getEmployers: builder.query({
            query: () => ``,
            providesTags: ['Employer']
        }),
        getEmployer: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Employer']
        }),
        addEmployer: builder.mutation({
            query: (data) => ({
                url: ``,
                method: 'POST',
                body: data
            }),
            providesTags: ['Employer']
        }),
        editEmployer: builder.mutation({
            query: (data) => ({
                url: `/${data.id}`,
                method: 'PUT',
                body: data.request,
            }),
            invalidatesTags: ['Employer']
        }),
        deleteEmployer: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Employer']
        })
    })
})

export const {
    useGetEmployersQuery,
    useGetEmployerQuery,
    useAddEmployerMutation,
    useEditEmployerMutation,
    useDeleteEmployerMutation
} = employerApi;