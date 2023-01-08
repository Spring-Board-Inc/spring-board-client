import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const experienceApi = createApi({ 
    reducerPath: 'experienceApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/info`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Xp'],
    endpoints: (builder) => ({
        getExperiences: builder.query({
            query: (userInfoId) => `/${userInfoId}/experience`,
            providesTags: ['Xp']
        }),
        getExperience: builder.query({
            query: (id) => `/experience/${id}`,
            invalidatesTags: ['Xp']
        }),
        addExperience: builder.mutation({
            query: ({ userInfoId, ...rest}) => ({
                url: `${userInfoId}/experience`,
                method: 'POST',
                body: rest
            }),
            invalidatesTags: ['Xp']
        }),
        editExperience: builder.mutation({
            query: ({ id, ...rest}) => ({
                url: `/experience/${id}`,
                method: 'PUT',
                body: rest,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: ['Xp']
        }),
        deleteExperience: builder.mutation({
            query: (id) => ({
                url: `/experience/${id}`,
                method: 'DELETE',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: ['Xp']
        })
    })
})

export const {
    useAddExperienceMutation,
    useDeleteExperienceMutation,
    useEditExperienceMutation,
    useGetExperienceQuery,
    useGetExperiencesQuery
} = experienceApi;