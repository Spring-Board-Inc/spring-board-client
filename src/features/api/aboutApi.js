import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const aboutApi = createApi({ 
    reducerPath: 'aboutApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/about`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['About'],
    endpoints: (builder) => ({
        createAbout: builder.mutation({
            query: (formData) => ({
                url: '',
                method: 'POST',
                body: formData
            }),
            providesTags: ["About"]
        }),
        getAbout: builder.query({
            query: () => ``,
            invalidatesTags: ["About"]
        }),
        getAboutById: builder.query({
            query: (id) => `/${id}`,
            invalidatesTags: ["About"]
        }),
        updateAbout: builder.mutation({
            query: ({id, formData }) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: formData
            }),
            invalidatesTags: ["About"]
        }),
        deleteAbout: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["About"]
        }),
        deprecateAbout: builder.mutation({
            query: (id) => ({
                url: `/deprecate/${id}`,
                method: 'PATCH'
            }),
            invalidatesTags: ["About"]
        })
    })
})

export const {
  useCreateAboutMutation,
  useDeleteAboutMutation,
  useDeprecateAboutMutation,
  useGetAboutQuery,
  useUpdateAboutMutation,
  useGetAboutByIdQuery
} = aboutApi;