/* eslint-disable no-unused-vars */
import s from './Auth.module.css'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE
} from '../../utils/constants'
import RegistInput from '../../components/RegistInput/RegistInput'

function Auth() {
    const { pathname } = useLocation()

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [validationError, setValidationError] = useState('')

    const loginPage = pathname === LOGIN_ROUTE

    return (
        <div className={s.page}>
            <form className={s.form} onSubmit={(e) => e.preventDefault()}>
                <div className={s.modalLogo}>
                    <img src="/img/logoAuth.svg" alt="logo" />
                </div>
                <Input
                    placeholder="email"
                    classes={[s.login, validationError === 'email' && s.error]}
                    type="text"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <Input
                    placeholder="Пароль"
                    classes={[
                        s.login,
                        validationError === 'password' && s.error
                    ]}
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                
                {!loginPage && <RegistInput />}

                <Button color={'blue'} onClick={() => navigate(MAIN_ROUTE)}>
                    {loginPage ? 'Войти' : 'Зарегистрироваться'}
                </Button>
                {loginPage && (
                    <Button
                        color={'light'}
                        onClick={() => navigate(REGISTRATION_ROUTE)}
                    >
                        Зарегистрироваться
                    </Button>
                )}
            </form>
        </div>
    )
}

export default Auth
