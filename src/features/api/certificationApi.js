import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const certificationApi = createApi({ 
    reducerPath: 'certificationApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/info`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Cert'],
    endpoints: (builder) => ({
        getCertifications: builder.query({
            query: (userInfoId) => `/${userInfoId}/certification`,
            providesTags: ['Cert']
        }),
        getCertification: builder.query({
            query: (id) => `/certification/${id}`,
            invalidatesTags: ['Cert']
        }),
        addCertification: builder.mutation({
            query: ({ userInfoId, ...rest}) => ({
                url: `${userInfoId}/certification`,
                method: 'POST',
                body: rest
            }),
            invalidatesTags: ['Cert']
        }),
        editCertification: builder.mutation({
            query: ({ id, ...rest}) => ({
                url: `/certification/${id}`,
                method: 'PUT',
                body: rest,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: ['Cert']
        }),
        deleteCertification: builder.mutation({
            query: (id) => ({
                url: `/certification/${id}`,
                method: 'DELETE',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: ['Cert']
        })
    })
})

export const {
    useAddCertificationMutation,
    useDeleteCertificationMutation,
    useEditCertificationMutation,
    useGetCertificationQuery,
    useGetCertificationsQuery
} = certificationApi;