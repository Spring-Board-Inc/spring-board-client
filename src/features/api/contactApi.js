import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const contactApi = createApi({ 
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/contact`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (contact) => ({
                url: '',
                method: 'POST',
                body: contact
            }),
            providesTags: ["Contact"]
        }),
        getContact: builder.query({
            query: () => ``,
            invalidatesTags: ["Contact"]
        }),
        getContactById: builder.query({
            query: (id) => `/${id}`,
            invalidatesTags: ["Contact"]
        }),
        updateContact: builder.mutation({
            query: ({id, contact }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: contact
            }),
            invalidatesTags: ["Contact"]
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Contact"]
        }),
        deprecateContact: builder.mutation({
            query: (id) => ({
                url: `/deprecate/${id}`,
                method: 'PATCH'
            }),
            invalidatesTags: ["Contact"]
        })
    })
})

export const {
  useCreateContactMutation,
  useDeleteContactMutation,
  useDeprecateContactMutation,
  useGetContactByIdQuery,
  useGetContactQuery,
  useUpdateContactMutation
} = contactApi;