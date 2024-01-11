/* eslint-disable no-unused-vars */
import s from './Auth.module.css'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import RegistInput from '../../components/RegistInput/RegistInput'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants'
import { authSlice } from '../../store/slice/auth'
import {
    useLoginMutation,
    useRegistrationMutation
} from '../../services/authApi'

function Auth() {
    const { pathname } = useLocation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [validationError, setValidationError] = useState('')

    const loginPage = pathname === LOGIN_ROUTE

    const [login, { error }] = useLoginMutation()
    const [registration] = useRegistrationMutation()

    const handleLogin = async () => {
        if (email === '' || password === '') {
            console.log('Укажите почту/пароль')
            setValidationError(true)
        } else {
            try {
                const response = await login({ email, password })

                dispatch(
                    authSlice({
                        access: response.data.access_token,
                        refresh: response.data.refresh_token
                    })
                )

                navigate('/profile')
            } catch (error) {
                console.log('error', error)
            }
        }
    }

    const handleRegister = async () => {
        if (password !== repeatPassword) {
            console.log('Пароли не совпадают')
            setValidationError(true)
        } else {
            try {
                const response = await registration({
                    email,
                    name,
                    surname,
                    city,
                    password
                })

                navigate('/profile')
            } catch (error) {
                console.log('error', error)
            }
        }
    }

    return (
        <div className={s.page}>
            <form className={s.form} onSubmit={(e) => e.preventDefault()}>
                <div className={s.modalLogo}>
                    <img src="/img/logoAuth.svg" alt="logo" />
                </div>
                <Input
                    placeholder="email"
                    classes={[s.login, validationError && s.error]}
                    type="text"
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setValidationError(false)
                    }}
                />
                <Input
                    placeholder="Пароль"
                    classes={[s.login, validationError && s.error]}
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setValidationError(false)
                    }}
                />

                {!loginPage && (
                    <RegistInput
                        validationError={validationError}
                        setRepeatPassword={setRepeatPassword}
                        setName={setName}
                        setSurname={setSurname}
                        setCity={setCity}
                        setValidationError={setValidationError}
                    />
                )}

                <Button
                    color={'blue'}
                    onClick={loginPage ? handleLogin : handleRegister}
                >
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
