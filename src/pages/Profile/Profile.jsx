import { useDispatch } from 'react-redux'
import ProfileInput from '../../components/ProfileInput/ProfileInput'
import Header from '../../components/common/Header/Header'
import Menu from '../../components/common/Menu/Menu'
import ProductList from '../../components/product/ProductList/ProductList'
import { productsUser } from '../../mock/products'
import { useGetUsersAllQuery } from '../../services/userApi'
import s from './Profile.module.css'
import { useEffect } from 'react'
import { setUsersAll } from '../../store/slice/user'
import { useAuthSelector } from '../../store/slice/auth'

function Profile() {
    const dispatch = useDispatch()

    const { data: usersAllData } = useGetUsersAllQuery()

    const { email } = useAuthSelector()

    const userData = usersAllData?.filter((el) => el.email === email)
    console.log('userData', userData)

    useEffect(() => {
        dispatch(setUsersAll(usersAllData))
        // dispatch(
        //     setAuth({
        //         name: userData?.[0]?.name,
        //         email: userData?.[0]?.email,
        //         id: userData?.[0]?.id,
        //         city: userData?.[0]?.city,
        //         avatar: userData?.[0]?.avatar,
        //         sells_from: userData?.[0]?.sells_from,
        //         phone: userData?.[0]?.phone,
        //         role: userData?.[0]?.role,
        //         surname: userData?.[0]?.surname
        //     })
        // )
    }, [])

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <main className={s.main}>
                    <Menu />
                    <div className={s.content}>
                        <h2 className={s.title}>
                            Здравствуйте, {userData?.[0]?.name}!
                        </h2>
                        <div className={s.profile}>
                            <h3 className={s.titleProfile}>
                                Настройки профиля
                            </h3>
                            <ProfileInput formInfo={userData?.[0]} />
                        </div>
                        <h3 className={s.titleProfile}>Мои товары</h3>
                        <ProductList
                            products={productsUser}
                            isProfilePage={true}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Profile
