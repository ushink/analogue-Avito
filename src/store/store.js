import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/auth'
// import adsSlice from './slice/ads'
import { authApi } from '../services/authApi'
import { adsApi } from '../services/adsApi'

const store = configureStore({
    reducer: {
        auth: authSlice,
        // ads: adsSlice,
        [authApi.reducerPath]: authApi.reducer,
        [adsApi.reducerPath]: adsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(adsApi.middleware)
})

export default store
