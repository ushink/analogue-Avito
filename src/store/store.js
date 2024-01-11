import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/auth'
import { authApi } from '../services/authApi'

const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)
})

export default store
