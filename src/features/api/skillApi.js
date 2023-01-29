import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const skillApi = createApi({ 
    reducerPath: 'skillApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/skill`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Skill'],
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => ``,
            providesTags: ['Skill']
        }),
        getSkill: builder.query({
            query: (id) => `/${id}`,
            invalidatesTags: ['Skill']
        }),
        addSkill: builder.mutation({
            query: (data) => ({
                url: ``,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Skill']
        }),
        editSkill: builder.mutation({
            query: ({ id, formData}) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['Skill']
        }),
        deleteSkill: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Skill']
        })
    })
})

export const {
    useAddSkillMutation,
    useDeleteSkillMutation,
    useEditSkillMutation,
    useGetSkillQuery,
    useGetSkillsQuery
} = skillApi;