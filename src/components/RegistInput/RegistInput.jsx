import Input from '../UI/Input/Input'
import s from '../../pages/Auth/Auth.module.css'

function RegistInput({
    validationError,
    setRepeatPassword,
    setName,
    setLastName,
    setCity
}) {
    return (
        <>
            <Input
                placeholder="Повторите пароль"
                classes={[s.login, validationError === 'password' && s.error]}
                type="password"
                onChange={(e) => {
                    setRepeatPassword(e.target.value)
                }}
            />
            <Input
                placeholder="Имя (необязательно)"
                classes={[s.login, validationError === 'text' && s.error]}
                type="text"
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />
            <Input
                placeholder="Фамилия (необязательно)"
                classes={[s.login, validationError === 'text' && s.error]}
                type="text"
                onChange={(e) => {
                    setLastName(e.target.value)
                }}
            />
            <Input
                placeholder="Город (необязательно)"
                classes={[s.login, validationError === 'text' && s.error]}
                type="text"
                onChange={(e) => {
                    setCity(e.target.value)
                }}
            />
        </>
    )
}

export default RegistInput
