import { useLocation } from 'react-router'
import s from './Menu.module.css'
import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    MAIN_ROUTE
} from '../../../utils/constants'
import { Link } from 'react-router-dom'

function Menu() {
    const { pathname } = useLocation()

    if (pathname === LOGIN_ROUTE || pathname === REGISTRATION_ROUTE)
        return <></>

    return (
        <div className={s.menu}>
            <img className={s.img} src="../../img/Logo.svg" alt="logo" />
            {pathname === MAIN_ROUTE ? (
                <form className={s.form} action="#">
                    <input
                        className={s.search}
                        type="search"
                        placeholder="Поиск по объявлениям"
                    />
                    <button className={s.btnSearch}>Найти</button>
                </form>
            ) : (
                <Link to={MAIN_ROUTE}>
                    <button className={s.btn}>Вернуться на главную</button>
                </Link>
            )}
        </div>
    )
}

export default Menu
