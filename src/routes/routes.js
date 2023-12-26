import Auth from '../pages/Auth'
import Profile from '../pages/Course'
import MainPage from '../pages/MainPage'
import SellerProfile from '../pages/SellerProfile'
import Adv from '../pages/Adv'


import {
    MAIN_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    PROFILE_ROUTE,
    SELLER_ROUTE,
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
        element: <MainPage />,
        path: MAIN_ROUTE
    },
    {
        element: <SellerProfile />,
        path: SELLER_ROUTE
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
