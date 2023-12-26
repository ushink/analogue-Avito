import Auth from '../pages/Auth/Auth'
import Profile from '../pages/Profile/Profile'
import Main from '../pages/Main/Main'
import Adv from '../pages/Adv/Adv'

import {
    MAIN_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    PROFILE_ROUTE,
    ADV_ROUTE
} from '../utils/constants'

export const publicRoutes = [
    {
        element: <Auth />,
        path: LOGIN_ROUTE
    },
    {
        element: <Auth />,
        path: REGISTRATION_ROUTE
    },
    {
        element: <Main />,
        path: MAIN_ROUTE
    },
    {
        element: <Adv />,
        path: ADV_ROUTE
    }
]

export const privateRoutes = [
    {
        element: <Profile />,
        path: PROFILE_ROUTE
    }
]
