import s from './Form.module.css'

function Form() {
    return (
        <form className={s.form} action="#">
            <input
                className={s.input}
                type="search"
                placeholder="Поиск по объявлениям"
            />
            <button className={s.btnSearch}>Найти</button>
        </form>
    )
}

export default Form
