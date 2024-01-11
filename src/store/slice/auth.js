import { createSlice } from '@reduxjs/toolkit'
// import { createAsyncThunk } from '@reduxjs/toolkit'

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

// export const fetchAuth = createAsyncThunk('fetchAuth', async (body) => {
//     console.log(body)

//     const response = await fetch('http://localhost:8090/auth/login', {
//         method: 'POST',
//         body: JSON.stringify(body)
//     })
//     const data = await response.json()
//     return data
// })

export const authSlice = createSlice({
    name: 'authReducer',

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
        }
    }
    // extraReducers: (builder) => {
    //     builder.addCase(fetchAuth.fulfilled, (state, action) => {
    //         state.auth = action.payload

    //         localStorage.setItem(AUTH_KEY, JSON.stringify(state))
    //     })
    // }
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer
