import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../helpers/Helpers';

export const countryApi = createApi({ 
    reducerPath: 'countryApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/location/country`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.AccessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['Country'],
    endpoints: (builder) => ({
        getCountries: builder.query({
            query: ({pageNumber, searchTerm}) => `?PageNumber=${pageNumber}&SearchBy=${searchTerm}`,
            providesTags: ['Country']
        }),
        getCountriesNoPaging: builder.query({
            query: () => ``,
            providesTags: ['Country']
        }),
        getCountry: builder.query({
            query: (id) => `/${id}`,
            invalidatesTags: ['Country']
        }),
        addCountry: builder.mutation({
            query: (data) => ({
                url: '',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Country']
        }),
        editCountry: builder.mutation({
            query: ({ id, ...rest}) => ({
                url: `/${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['Country']
        }),
        deleteCountry: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Country']
        })
    })
})

export const {
    useAddCountryMutation,
    useDeleteCountryMutation,
    useEditCountryMutation,
    useGetCountriesQuery,
    useGetCountryQuery,
    useGetCountriesNoPagingQuery
} = countryApi;