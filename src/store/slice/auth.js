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
    id: null,
    name: null,
    email: null,
    city: null,
    avatar: null,
    sells_from: null,
    phone: null,
    role: null,
    surname: null
}

export const authSlice = createSlice({
    name: 'auth',

    initialState: getAuthFromLocalStorage() ?? initialState,
    reducers: {
        setAuth(state, action) {
            const payload = action.payload ?? initialState

            state.refresh = payload.refresh
            state.access = payload.access
            state.id = payload.id
            state.name = payload.name
            state.email = payload.email
            state.city = payload.city
            state.avatar = payload.avatar
            state.sells_from = payload.sells_from
            state.phone = payload.phone
            state.role = payload.role
            state.surname = payload.surname

            localStorage.setItem(AUTH_KEY, JSON.stringify(state))
        },
        logout: (state) => {
            localStorage.clear()
            state.refresh = null
            state.access = null
            state.id = null
            state.name = null
            state.email = null
            state.city = null
            state.avatar = null
            state.sells_from = null
            state.phone = null
            state.role = null
            state.surname = null
        }
    }
})

export const { setAuth, logout } = authSlice.actions

export default authSlice.reducer

export const useAuthSelector = () => {
    const {
        refresh,
        access,
        id,
        name,
        email,
        city,
        avatar,
        sells_from,
        phone,
        role,
        surname
    } = useSelector((store) => store.auth)
    return {
        refresh,
        access,
        id,
        name,
        email,
        city,
        avatar,
        sells_from,
        phone,
        role,
        surname
    }
}
