import { useNavigate } from 'react-router'
import Button from '../UI/Button/Button'
import s from './ProfileInput.module.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { logout } from '../../store/slice/auth'
import { toast } from 'react-toastify'

function ProfileInput({ formInfo }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isButtonActiv, setIsButtonActiv] = useState(false)

    const handelLogout = () => {
        dispatch(logout())
        toast.success('Успешно')
        setIsButtonActiv(true)
        navigate('/login')
    }
    return (
        <div className={s.box}>
            <div className={s.avatar}>
                <div className={s.foto}></div>
                <button className={s.btnChange}>Заменить</button>
            </div>
            <form className={s.form} action="#">
                <div className={s.item}>
                    <label className={s.label}>Имя</label>
                    <input
                        className={s.input}
                        type="text"
                        placeholder={formInfo?.name}
                    />
                </div>
                <div className={s.item}>
                    <label className={s.label}>Фамилия</label>
                    <input
                        className={s.input}
                        type="text"
                        placeholder={formInfo?.surname}
                    />
                </div>
                <div className={s.item}>
                    <label className={s.label}>Город</label>
                    <input
                        className={s.input}
                        type="text"
                        placeholder={formInfo?.city}
                    />
                </div>
                <div className={s.item}>
                    <label className={s.label}>Телефон</label>
                    <input
                        className={s.inputTel}
                        type="tel"
                        placeholder={formInfo?.phone}
                    />
                </div>
                <Button color={'btnSave'} disabled={isButtonActiv}>
                    {'Сохранить'}
                </Button>
                <Button
                    color={'btnLogout'}
                    onClick={() => handelLogout()}
                    disabled={isButtonActiv}
                >
                    {'Выйти из профиля'}
                </Button>
            </form>
        </div>
    )
}

export default ProfileInput
