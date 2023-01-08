import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const educationApi = createApi({ 
    reducerPath: 'educationApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/info`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Edus'],
    endpoints: (builder) => ({
        getEducations: builder.query({
            query: (userInfoId) => `/${userInfoId}/education`,
            providesTags: ['Edus']
        }),
        getEducation: builder.query({
            query: (id) => `/education/${id}`,
            invalidatesTags: ['Edus']
        }),
        addEducation: builder.mutation({
            query: ({ userInfoId, ...rest}) => ({
                url: `${userInfoId}/education`,
                method: 'POST',
                body: rest
            }),
            invalidatesTags: ['Edus']
        }),
        editEducation: builder.mutation({
            query: ({ id, ...rest}) => ({
                url: `/education/${id}`,
                method: 'PATCH',
                body: rest,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: ['Edus']
        }),
        deleteEducation: builder.mutation({
            query: (id) => ({
                url: `/education/${id}`,
                method: 'DELETE',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: ['Edus']
        })
    })
})

export const {
    useAddEducationMutation,
    useDeleteEducationMutation,
    useEditEducationMutation,
    useGetEducationQuery,
    useGetEducationsQuery
} = educationApi;