import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryReauth from './baseQueryReauth'

export const adsApi = createApi({
    reducerPath: 'ads',
    tagTypes: ['ads', 'favAds', 'comments'],

    baseQuery: baseQueryReauth,

    endpoints: (build) => ({
        // получить все объявления
        getAdsAll: build.query({
            query: () => `/ads`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'ads', id })),
                          { type: 'ads', id: 'LIST' }
                      ]
                    : [{ type: 'ads', id: 'LIST' }]
        }),

        // получить объявления пользователя
        getFavAds: build.query({
            query: () => `/ads/me`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'favAds',
                              id
                          })),
                          { type: 'favAds', id: 'LIST' }
                      ]
                    : [{ type: 'favAds', id: 'LIST' }]
        }),

        // получить объявление по id
        getAdsId: build.query({
            query: (id) => `/ads/${id}`
        }),

        // создать обьявление без изображений
        postTextAds: build.mutation({
            query: ({ title, description, price }) => ({
                url: `/adstext`,
                method: 'POST',
                body: JSON.stringify({
                    title,
                    description,
                    price
                }),
                headers: { 'content-type': 'application/json' }
            }),
            invalidatesTags: [{ type: 'ads', id: 'LIST' }]
        }),

        // добавить изображения в объявление
        postImgAds: build.mutation({
            query: ({ data, id }) => {
                const formData = new FormData()
                if (data) {
                    formData.append('file', data)
                }
                return {
                    url: `/ads/${id}/image`,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [{ type: 'ads', id: 'LIST' }]
        }),

        deleteAds: build.mutation({
            query(id) {
                return {
                    url: `/ads/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: [{ type: 'ads', id: 'LIST' }]
        }),

        // изменить объявление
        updateAds: build.mutation({
            query: ({ id, ...patch }) => ({
                url: `/ads/${id}`,
                method: 'PATCH',
                body: patch
            }),
            async onQueryStarted(
                { id, ...patch },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    adsApi.util.updateQueryData('getUser', id, (draft) => {
                        Object.assign(draft, patch)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),

        // получить комментарии по id
        getComments: build.query({
            query: (id) => `/ads/${id}/comments`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'comments', id })),
                          { type: 'comments', id: 'LIST' }
                      ]
                    : [{ type: 'comments', id: 'LIST' }]
        }),

        // создать комментарий к обьявлению
        postComments: build.mutation({
            query: ({ id, text }) => ({
                url: `/ads/${id}/comments`,
                method: 'POST',
                body: JSON.stringify({
                    text
                }),
                headers: { 'content-type': 'application/json' }
            }),
            invalidatesTags: [{ type: 'comments', id: 'LIST' }]
        })
    })
})

export const {
    useGetAdsAllQuery,
    useGetFavAdsQuery,
    useGetAdsIdQuery,
    useGetCommentsQuery,
    usePostCommentsMutation,
    usePostTextAdsMutation,
    usePostImgAdsMutation,
    useDeleteAdsMutation,
    useUpdateAdsMutation
} = adsApi
