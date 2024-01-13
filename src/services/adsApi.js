import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adsApi = createApi({
    reducerPath: 'ads',
    tagTypes: ['ads', 'favAds'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8090/'
    }),
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
        })
    })
})

export const { useGetAdsAllQuery, useGetFavAdsQuery } = adsApi
