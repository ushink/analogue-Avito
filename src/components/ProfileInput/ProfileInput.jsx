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
        localStorage.clear()
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
                {formInfo.map((el) => (
                    <div className={s.item} key={el.id}>
                        <label className={s.label}>{el.label}</label>
                        <input
                            className={el.type === 'tel' ? s.inputTel : s.input}
                            type={el.type}
                            placeholder={el.placeholder}
                        />
                    </div>
                ))}
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
