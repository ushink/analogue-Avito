import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/auth'
import userReducer from './slice/user'
import { authApi } from '../services/authApi'
import { adsApi } from '../services/adsApi'
import { userApi } from '../services/userApi'

const store = configureStore({
    reducer: {
        authorization: authReducer,
        user: userReducer,
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
