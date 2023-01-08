import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const authApi = createApi({ 
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/auth` }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credential) => ({
                url: '/login',
                method: 'POST',
                body: credential
            })
        }),
        confirmEmail: builder.mutation({
            query: (data) => ({
                url: '/confirm-email',
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData
            })
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/forgot-password',
                method: 'PATCH',
                body: data,
                responseHandler: (response) => response.text()
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: '/change-password',
                method: 'PUT',
                body: data,
                responseHandler: (response) => response.text()
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/reset-password',
                method: 'POST',
                body: data,
                responseHandler: (response) => response.text()
            })
        })
    })
})

export const {
    useLoginMutation,
    useConfirmEmailMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useChangePasswordMutation,
    useResetPasswordMutation
} = authApi;