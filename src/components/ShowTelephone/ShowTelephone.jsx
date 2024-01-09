import { useLocation } from 'react-router'
import s from './ShowTelephone.module.css'
import { ADV_ROUTE } from '../../utils/constants'
import Button from '../UI/Button/Button'

function ShowTelephone() {
    const { pathname } = useLocation()

    const advPage = pathname.slice(0, -2) === ADV_ROUTE.slice(0, -4)

    return (
        <>
            {advPage ? (
                <div className={s.box}>
                    <h4 className={s.title}>Показать телефон</h4>
                    <p className={s.number}>8 905 ХХХ ХХ ХХ</p>
                </div>
            ) : (
                <>
                    <Button color={'custom'}>{'Редактировать'}</Button>
                    <Button color={'custom'}>{'Снять с публикации'}</Button>
                </>
            )}
        </>
    )
}

export default ShowTelephone
