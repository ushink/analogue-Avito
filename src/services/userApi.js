import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryReauth from './baseQueryReauth'

export const userApi = createApi({
    reducerPath: 'user',
    tagTypes: ['user'],

    baseQuery: baseQueryReauth,

    endpoints: (build) => ({
        // получить текущего пользователя
        getUser: build.query({
            query: () => `/user`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'user', id })),
                          { type: 'user', id: 'LIST' }
                      ]
                    : [{ type: 'user', id: 'LIST' }]
        }),

        // получить всех пользователей
        getUsersAll: build.query({
            query: () => `/user/all`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'user', id })),
                          { type: 'user', id: 'LIST' }
                      ]
                    : [{ type: 'user', id: 'LIST' }]
        }),

        // добавить аватар пользователя
        postAvatar: build.mutation({
            query: (data) => {
                const formData = new FormData()
                if (data) {
                    formData.append('file', data)
                }
                return {
                    url: '/user/avatar',
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [{ type: 'user', id: 'LIST' }]
        })
    })
})

export const { useGetUserQuery, useGetUsersAllQuery, usePostAvatarMutation } =
    userApi
