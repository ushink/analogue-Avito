/* eslint-disable no-unused-vars */
import s from './Auth.module.css'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import RegistInput from '../../components/RegistInput/RegistInput'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants'
import { setAuth } from '../../store/slice/auth'
import {
    useLoginMutation,
    useRegistrationMutation
} from '../../services/authApi'
import { toast } from 'react-toastify'

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
    const [isButtonActiv, setIsButtonActiv] = useState(false)

    const loginPage = pathname === LOGIN_ROUTE

    const [
        login,
        {
            data: loginData,
            isSuccess: isLoginSuccess,
            error: loginError,
            isError: isLoginError
        }
    ] = useLoginMutation()
    const [
        registration,
        {
            data: registerData,
            isSuccess: isRegisterSuccess,
            error: registerError,
            isError: isRegisterError
        }
    ] = useRegistrationMutation()

    // функция входа
    const handleLogin = async () => {
        if (email === '' || password === '') {
            toast.error('Введите почту/пароль')
            setValidationError(true)
        }
        if (email && password) {
            setIsButtonActiv(true)
            await login({ email, password })
        }
    }

    // функция регистрации
    const handleRegister = async () => {
        if (password !== repeatPassword) {
            toast.error('Пароли не совпадают')
            setValidationError(true)
        }
        if (email && password) {
            setIsButtonActiv(true)
            await registration({
                email,
                name,
                surname,
                city,
                password
            })
        }
    }

    // эффект при успешном входе/регстрации
    useEffect(() => {
        if (isLoginSuccess) {
            toast.success('Успешно')
            dispatch(
                setAuth({
                    access: loginData.access_token,
                    refresh: loginData.refresh_token
                })
            )
            localStorage.setItem('user', true)
            navigate('/profile')
        }

        if (isRegisterSuccess) {
            toast.success('Регистрация пройдена успешно')
            dispatch(
                setAuth({
                    access: registerData.access_token,
                    refresh: registerData.refresh_token
                })
            )
            localStorage.setItem('user', true)
            navigate('/profile')
        }
    }, [isLoginSuccess, isRegisterSuccess])

    // эффект при ошибке входа/регстрации
    useEffect(() => {
        if (isLoginError) {
            toast.error(loginError.data.detail)
            setIsButtonActiv(false)
        }
        if (isRegisterError) {
            toast.error(registerError.data.detail)
            setIsButtonActiv(false)
        }
    }, [isLoginError, isRegisterError])

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
                    disabled={isButtonActiv}
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
