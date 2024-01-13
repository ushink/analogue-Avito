import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/auth'
// import adsSlice from './slice/ads'
import { authApi } from '../services/authApi'
import { adsApi } from '../services/adsApi'
import { userApi } from '../services/userApi'

const store = configureStore({
    reducer: {
        auth: authSlice,
        // ads: adsSlice,
        [authApi.reducerPath]: authApi.reducer,
        [adsApi.reducerPath]: adsApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(adsApi.middleware)
            .concat(userApi.middleware)
})

export default store
