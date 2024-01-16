import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const AUTH_KEY = 'auth'

function getAuthFromLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_KEY))
    } catch (error) {
        console.log(error)
        return null
    }
}

const initialState = {
    refresh: null,
    access: null,
    email: null
}

export const authSlice = createSlice({
    name: 'auth',

    initialState: getAuthFromLocalStorage() ?? initialState,
    reducers: {
        setAuth(state, action) {
            const payload = action.payload ?? initialState

            state.refresh = payload.refresh
            state.access = payload.access
            state.email = payload.email

            localStorage.setItem(AUTH_KEY, JSON.stringify(state))
        },
        logout: (state) => {
            localStorage.clear()
            state.refresh = null
            state.access = null
            state.email = null
        }
    }
})

export const { setAuth, logout } = authSlice.actions

export default authSlice.reducer

export const useAuthSelector = () => {
    const { refresh, access, email } = useSelector(
        (store) => store.authorization
    )
    return {
        refresh,
        access,
        email
    }
}
