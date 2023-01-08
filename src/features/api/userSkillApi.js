import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const userSkillApi = createApi({ 
    reducerPath: 'userSkillApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/info`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Skill'],
    endpoints: (builder) => ({
        getUserSkills: builder.query({
            query: (userInfoId) => `/${userInfoId}/skill`,
            providesTags: ['Skill']
        }),
        getUserSkill: builder.query({
            query: ({ skillId, userInfoId }) => `${userInfoId}/skill/${skillId}`,
            invalidatesTags: ['Skill']
        }),
        addUserSkill: builder.mutation({
            query: ({ skillId, userInfoId, ...rest}) => ({
                url: `/${userInfoId}/skill/${skillId}`,
                method: 'POST',
                body: rest
            }),
            invalidatesTags: ['Skill']
        }),
        editUserSkill: builder.mutation({
            query: ({ skillId, userInfoId, ...rest}) => ({
                url: `/${userInfoId}/skill/${skillId}`,
                method: 'PUT',
                body: rest,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: ['Skill']
        }),
        deleteUserSkill: builder.mutation({
            query: ({ skillId, userInfoId }) => ({
                url: `/${userInfoId}/skill/${skillId}`,
                method: 'DELETE',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: ['Skill']
        })
    })
})

export const {
    useAddUserSkillMutation,
    useDeleteUserSkillMutation,
    useEditUserSkillMutation,
    useGetUserSkillQuery,
    useGetUserSkillsQuery
} = userSkillApi;