import s from './Header.module.css'

function Header() {
    return (
        <header className={s.header}>
            <nav className={s.nav}>
                <button className={s.btnMain}>Вход в личный кабинет</button>
            </nav>
        </header>
    )
}

export default Header
