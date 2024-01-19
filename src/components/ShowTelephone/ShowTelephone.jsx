import s from './ShowTelephone.module.css'
import { useState } from 'react'

function ShowTelephone({ phoneData }) {
    const [phone, setPhone] = useState(false)

    return (
        <div className={s.box} onClick={() => setPhone(true)}>
            <h4 className={s.title}>Показать телефон</h4>
            <p className={s.number}>
                {phone
                    ? phoneData
                    : `${phoneData?.substr(0, 4) + ' ХХХ ХХ ХХ'}`}
            </p>
        </div>
    )
}

export default ShowTelephone
