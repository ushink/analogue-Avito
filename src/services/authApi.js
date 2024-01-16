import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryReauth from './baseQueryReauth'

export const authApi = createApi({
    reducerPath: 'auth',
    tagTypes: ['Auth'],

    baseQuery: baseQueryReauth,

    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                url: 'auth/login/',
                method: 'POST',
                body,
                headers: {
                    'content-type': 'application/json'
                },
                invalidatesTags: [{ type: 'Auth', id: 'LIST' }]
            })
        }),
        registration: build.mutation({
            query: (body) => ({
                url: 'auth/register/',
                method: 'POST',
                body,
                headers: {
                    'content-type': 'application/json'
                },
                invalidatesTags: [{ type: 'Auth', id: 'LIST' }]
            })
        })
    })
})

export const { useLoginMutation, useRegistrationMutation } = authApi
