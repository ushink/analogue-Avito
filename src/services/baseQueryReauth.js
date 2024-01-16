import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, setAuth } from '../store/slice/auth'

const baseQueryReauth = async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: 'http://localhost:8090/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authorization?.access

            console.debug('Использую токен из стора', { token })

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    })

    // Делаем запрос
    const result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status !== 401) {
        return result
    }

    const forseLogout = () => {
        console.debug('Принудительная авторизация')
        api.dispatch(logout())
    }

    // Функция getState возвращает состояние redux стейта целиком,
    // ее нам предоставляет rtk query,
    // она прилетает параметром запроса в функцию

    const { authorization } = api.getState()
    console.debug('Данные пользователя в сторе', { authorization })

    if (!authorization.refresh) {
        return forseLogout()
    }

    // Делаем запрос за новым access токеном в API обновления токена

    const refreshResult = await baseQuery(
        {
            url: 'auth/login/',
            method: 'PUT',
            body: {
                access_token: authorization.access,
                refresh_token: authorization.refresh
            },
            headers: {
                'content-type': 'application/json'
            }
        },
        api,
        extraOptions
    )

    console.debug('Результат запроса на обновление токена', { refreshResult })

    if (!refreshResult.data.access_token) {
        return forseLogout()
    }

    api.dispatch(
        setAuth({
            ...authorization,
            access: refreshResult.data?.access_token,
            refresh: refreshResult.data?.refresh_token
        })
    )

    const retryResult = await baseQuery(args, api, extraOptions)

    if (retryResult?.error?.status === 401) {
        return forseLogout()
    }

    console.debug('Повторный запрос завершился успешно')

    return retryResult
}

export default baseQueryReauth
