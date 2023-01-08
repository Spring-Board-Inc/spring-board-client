import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const profileApi = createApi({ 
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/users`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Profile']
        }),
        getUsers: builder.query({
            query: (query) => `/${query}`,
            providesTags: ['Users']
        }),
        editNames: builder.mutation({
            query: ({ id, ...rest}) => ({
                url: `/edit-names/${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['Profile']
        }),
        activate: builder.mutation({
            query: (id) => ({
                url: `/activate/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Profile', 'Users']
        }),
        deactivate: builder.mutation({
            query: (id) => ({
                url: `/deactivate/${id}`,
                method: 'PUT',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: ['Users']
        }),
        editAddress: builder.mutation({
            query: ({ id, ...rest}) => ({
                url: `/edit-address/${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['Profile']
        })
    })
})

export const {
    useGetUserProfileQuery,
    useEditNamesMutation,
    useActivateMutation,
    useDeactivateMutation,
    useGetUsersQuery,
    useEditAddressMutation
} = profileApi;