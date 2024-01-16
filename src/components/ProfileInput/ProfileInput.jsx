import { useNavigate } from 'react-router'
import Button from '../UI/Button/Button'
import s from './ProfileInput.module.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { logout } from '../../store/slice/auth'
import { toast } from 'react-toastify'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import { useUpdateUserMutation } from '../../services/userApi'

function ProfileInput({ formInfo }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [update] = useUpdateUserMutation()

    const [isButtonActiv, setIsButtonActiv] = useState(false)
    const [name, setName] = useState(formInfo?.name)
    const [surname, setSurname] = useState(formInfo?.surname)
    const [city, setCity] = useState(formInfo?.city)
    const [phone, setPhone] = useState(formInfo?.phone)

    const handleUpdateUser = async (event) => {
        event.preventDefault()
        setIsButtonActiv(true)
        try {
            await update({ name, surname, city, phone }).unwrap()
            location.reload(true)
        } catch {
            toast.error('Error')
        }
    }

    const handelLogout = () => {
        dispatch(logout())
        toast.success('Успешно')
        setIsButtonActiv(true)
        navigate('/login')
    }
    return (
        <div className={s.box}>
            <ProfileAvatar formInfo={formInfo} />
            <form className={s.form} action="#" onSubmit={handleUpdateUser}>
                <div className={s.item}>
                    <label className={s.label}>Имя</label>
                    <input
                        className={s.input}
                        type="text"
                        placeholder={formInfo?.name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </div>
                <div className={s.item}>
                    <label className={s.label}>Фамилия</label>
                    <input
                        className={s.input}
                        type="text"
                        placeholder={formInfo?.surname}
                        onChange={(e) => {
                            setSurname(e.target.value)
                        }}
                    />
                </div>
                <div className={s.item}>
                    <label className={s.label}>Город</label>
                    <input
                        className={s.input}
                        type="text"
                        placeholder={formInfo?.city}
                        onChange={(e) => {
                            setCity(e.target.value)
                        }}
                    />
                </div>
                <div className={s.item}>
                    <label className={s.label}>Телефон</label>
                    <input
                        className={s.inputTel}
                        type="tel"
                        pattern="[8]{1}[0-9]{10}"
                        placeholder={formInfo?.phone}
                        onChange={(e) => {
                            setPhone(e.target.value)
                        }}
                    />
                </div>
                <Button
                    color={'btnSave'}
                    disabled={isButtonActiv}
                    type={'submit'}
                >
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
