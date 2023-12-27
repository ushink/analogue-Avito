import { useLocation } from 'react-router'
import s from './Header.module.css'
import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    MAIN_ROUTE
} from '../../../utils/constants'

function Header() {
    const { pathname } = useLocation()

    if (pathname === LOGIN_ROUTE || pathname === REGISTRATION_ROUTE)
        return <></>

    return (
        <header className={s.header}>
            <nav className={s.nav}>
                {pathname === MAIN_ROUTE ? (
                    <button className={s.btn}>Вход в личный кабинет</button>
                ) : (
                    <>
                        <button className={s.btn}>Разместить объявление</button>
                        <button className={s.btn}>Личный кабинет</button>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header
