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

    const [isBtnSaveActive, setIsBtnSaveActive] = useState(true)
    const [isBtnLogoutActive, setIsBtnLogoutActive] = useState(false)

    const [name, setName] = useState(formInfo?.name)
    const [surname, setSurname] = useState(formInfo?.surname)
    const [city, setCity] = useState(formInfo?.city)
    const [phone, setPhone] = useState(formInfo?.phone)

    const handleUpdateUser = async (event) => {
        event.preventDefault()
        setIsBtnSaveActive(true)
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
        setIsBtnLogoutActive(true)
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
                        value={name}
                        placeholder={formInfo?.name}
                        onChange={(e) => {
                            setName(e.target.value)
                            setIsBtnSaveActive(false)
                        }}
                    />
                </div>
                <div className={s.item}>
                    <label className={s.label}>Фамилия</label>
                    <input
                        className={s.input}
                        type="text"
                        value={surname}
                        placeholder={formInfo?.surname}
                        onChange={(e) => {
                            setSurname(e.target.value)
                            setIsBtnSaveActive(false)
                        }}
                    />
                </div>
                <div className={s.item}>
                    <label className={s.label}>Город</label>
                    <input
                        className={s.input}
                        type="text"
                        value={city}
                        placeholder={formInfo?.city}
                        onChange={(e) => {
                            setCity(e.target.value)
                            setIsBtnSaveActive(false)
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
                            setIsBtnSaveActive(false)
                        }}
                    />
                </div>
                <Button
                    color={'btnSave'}
                    disabled={isBtnSaveActive}
                    type={'submit'}
                >
                    {'Сохранить'}
                </Button>
                <Button
                    color={'btnLogout'}
                    onClick={() => handelLogout()}
                    disabled={isBtnLogoutActive}
                >
                    {'Выйти из профиля'}
                </Button>
            </form>
        </div>
    )
}

export default ProfileInput
