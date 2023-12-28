import { useLocation } from 'react-router'
import s from './Header.module.css'
import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    MAIN_ROUTE,
    PROFILE_ROUTE
} from '../../../utils/constants'
import { Link } from 'react-router-dom'

function Header() {
    const { pathname } = useLocation()

    if (pathname === LOGIN_ROUTE || pathname === REGISTRATION_ROUTE)
        return <></>

    return (
        <header className={s.header}>
            <nav className={s.nav}>
                {pathname === MAIN_ROUTE ? (
                    <Link to={LOGIN_ROUTE}>
                        <button className={s.btn}>Вход в личный кабинет</button>
                    </Link>
                ) : (
                    <>
                        <button className={s.btn}>Разместить объявление</button>
                        <Link to={PROFILE_ROUTE}>
                            <button className={s.btn}>Личный кабинет</button>
                        </Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header
