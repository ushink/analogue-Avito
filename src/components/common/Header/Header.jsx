import { useLocation } from 'react-router'
import s from './Header.module.css'
import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    PROFILE_ROUTE
} from '../../../utils/constants'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Modal from '../../UI/Modal/Modal'
import NewAdv from '../../modals/NewAdv/NewAdv'

function Header() {
    const { pathname } = useLocation()

    const [modalActive, setModalActive] = useState(false)
    const user = JSON.parse(localStorage.getItem('user') || null)

    if (pathname === LOGIN_ROUTE || pathname === REGISTRATION_ROUTE)
        return <></>

    return (
        <header className={s.header}>
            <nav className={s.nav}>
                {!user ? (
                    <Link to={LOGIN_ROUTE}>
                        <button className={s.btn}>Вход в личный кабинет</button>
                    </Link>
                ) : (
                    <>
                        <button
                            className={s.btn}
                            onClick={() => setModalActive(true)}
                        >
                            Разместить объявление
                        </button>
                        <Link to={PROFILE_ROUTE}>
                            <button className={s.btn}>Личный кабинет</button>
                        </Link>
                        <Modal active={modalActive} setActive={setModalActive}>
                            <NewAdv setActive={setModalActive} />
                        </Modal>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header
