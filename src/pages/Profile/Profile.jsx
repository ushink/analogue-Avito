import { useDispatch, useSelector } from 'react-redux'
import ProfileInput from '../../components/ProfileInput/ProfileInput'
import Header from '../../components/common/Header/Header'
import Menu from '../../components/common/Menu/Menu'
import ProductList from '../../components/product/ProductList/ProductList'
import { formInfo } from '../../mock/formInfo'
import { productsUser } from '../../mock/products'
import { useGetUserQuery, useGetUsersAllQuery } from '../../services/userApi'
import s from './Profile.module.css'
import { useEffect } from 'react'
import { setUser, setUsersAll } from '../../store/slice/user'

function Profile() {
    const dispatch = useDispatch()

    const { data: usersAllData = [] } = useGetUsersAllQuery()
    const { data: userData } = useGetUserQuery()
    console.log(userData)

    useEffect(() => {
        dispatch(setUsersAll(usersAllData))
        dispatch(setUser(userData))
    }, [])

    const { usersAll } = useSelector((store) => store.user)
    console.log('select', usersAll)

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <main className={s.main}>
                    <Menu />
                    <div className={s.content}>
                        <h2 className={s.title}>Здравствуйте, Антон!</h2>
                        <div className={s.profile}>
                            <h3 className={s.titleProfile}>
                                Настройки профиля
                            </h3>
                            <ProfileInput formInfo={formInfo} />
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
