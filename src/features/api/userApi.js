import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const userApi = createApi({ 
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/users`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (query) => `/${query}`,
            providesTags: ['Users']
        }),
        getUser: builder.query({
            query: (id) => `/${id}`,
            invalidatesTags: ['Users']
        }),
        getUserDetails: builder.query({
            query: (id) => `/details/${id}`,
            invalidatesTags: ['Users']
        }),
        reactivate: builder.mutation({
            query: (id) => ({
                url: `/reactivate/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Users']
        }),
        suspend: builder.mutation({
            query: (id) => ({
                url: `/suspend/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {
    useGetUserQuery,
    useGetUsersQuery,
    useGetUserDetailsQuery,
    useSuspendMutation,
    useReactivateMutation
} = userApi;