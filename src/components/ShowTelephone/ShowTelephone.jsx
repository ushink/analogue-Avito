import s from './ShowTelephone.module.css'

function ShowTelephone() {
    return (
        <div className={s.box}>
            <h4 className={s.title}>Показать телефон</h4>
            <p className={s.number}>8 905 ХХХ ХХ ХХ</p>
        </div>
    )
}

export default ShowTelephone
