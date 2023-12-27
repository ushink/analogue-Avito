import s from './Menu.module.css'

function Menu() {
    return (
        <div className={s.menu}>
            <img className={s.img} src="./img/Logo.svg" alt="logo" />
            <form className={s.form} action="#">
                <input
                    className={s.search}
                    type="search"
                    placeholder="Поиск по объявлениям"
                />
                <button className={s.btnSearch}>Найти</button>
            </form>
        </div>
    )
}

export default Menu
