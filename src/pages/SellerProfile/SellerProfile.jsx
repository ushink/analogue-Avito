import s from './SellerProfile.module.css'
import Header from '../../components/common/Header/Header'
import Menu from '../../components/common/Menu/Menu'
import ProductList from '../../components/product/ProductList/ProductList'
import ShowTelephone from '../../components/ShowTelephone/ShowTelephone'
import { useGetUsersAllQuery } from '../../services/userApi'
import { useParams } from 'react-router'
import { useGetAdsAllQuery } from '../../services/adsApi'

function SellerProfile() {
    const { data: adsAllData = [] } = useGetAdsAllQuery()
    const { data: usersAllData } = useGetUsersAllQuery()

    const { id } = useParams()
    const num = Number(id - 1)

    const adsSeller = adsAllData.filter((el) => el.user_id === Number(id))

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <main className={s.main}>
                    <Menu />
                    <div className={s.content}>
                        <h2 className={s.title}>Профиль продавца</h2>
                        <div className={s.profile}>
                            <div>
                                <img
                                    className={s.foto}
                                    src={`http://localhost:8090/${usersAllData?.[num]?.avatar}`}
                                    alt="img"
                                />
                            </div>
                            <div className={s.form} action="#">
                                <div className={s.boxInfo}>
                                    <h4 className={s.name}>
                                        {usersAllData?.[num]?.name}{' '}
                                        {usersAllData?.[num]?.surname}
                                    </h4>
                                    <p className={s.city}>
                                        {usersAllData?.[num]?.city}
                                    </p>
                                    <p className={s.data}>
                                        Продает товары с{' '}
                                        {new Date(
                                            usersAllData?.[num]?.sells_from
                                        ).toLocaleString('ru', {
                                            dateStyle: 'long'
                                        })}
                                    </p>
                                </div>
                                <ShowTelephone
                                    data={usersAllData?.[num]?.phone}
                                />
                            </div>
                        </div>
                        <h3 className={s.subtitle}>Товары продавца</h3>
                        <ProductList ads={adsSeller} />
                    </div>
                </main>
            </div>
        </div>
    )
}
export default SellerProfile
