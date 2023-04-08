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
        }),
        uploadPhoto: builder.mutation({
            query: (data) => ({
                url: `/upload-photo/${data.id}`,
                method: 'POST',
                body: data.photoToUpload,
                responseHandler: (res) => res.text()
            }),
            invalidatesTags: ['Profile']
        }),
        updatePhoto: builder.mutation({
            query: (data) => ({
                url: `/update-photo/${data.id}`,
                method: 'PUT',
                body: data.photoToUpload,
                responseHandler: (res) => res.text()
            }),
            invalidatesTags: ['Profile']
        }),
        getUserDetails: builder.query({
            query: (id) => `/details/${id}`,
            invalidatesTags: ['Profile']
        })
    })
})

export const {
    useGetUserProfileQuery,
    useEditNamesMutation,
    useActivateMutation,
    useDeactivateMutation,
    useEditAddressMutation,
    useUploadPhotoMutation,
    useUpdatePhotoMutation,
    useGetUserDetailsQuery
} = profileApi;