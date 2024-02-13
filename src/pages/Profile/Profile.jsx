import ProfileInput from '../../components/ProfileInput/ProfileInput'
import Header from '../../components/common/Header/Header'
import Menu from '../../components/common/Menu/Menu'
import ProductList from '../../components/product/ProductList/ProductList'
import { useGetUsersAllQuery } from '../../services/userApi'
import s from './Profile.module.css'
import { useAuthSelector } from '../../store/slice/auth'
import { useGetFavAdsQuery } from '../../services/adsApi'
import MenuMob from '../../components/common/MenuMob/MenuMob'

function Profile() {
    const { data: adsUserData } = useGetFavAdsQuery()
    const { data: usersAllData } = useGetUsersAllQuery()

    const { email } = useAuthSelector()

    const userData = usersAllData?.filter((el) => el.email === email)

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
                        <ProductList ads={adsUserData} isProfilePage={true} />
                    </div>
                </main>
                <MenuMob />
            </div>
        </div>
    )
}

export default Profile
