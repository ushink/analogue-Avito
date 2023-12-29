import s from './SellerProfile.module.css'
import Header from '../../components/common/Header/Header'
import Menu from '../../components/common/Menu/Menu'
import ProductList from '../../components/product/ProductList/ProductList'
import { productsSeller } from '../../mock/products'
import ShowTelephone from '../../components/ShowTelephone/ShowTelephone'

function SellerProfile() {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <main className={s.main}>
                    <Menu />
                    <div className={s.content}>
                        <h2 className={s.title}>Профиль продавца</h2>
                        <div className={s.profile}>
                            <div className={s.foto}></div>
                            <div className={s.form} action="#">
                                <div className={s.boxInfo}>
                                    <h4 className={s.name}>Кирилл Матвеев</h4>
                                    <p className={s.city}>Санкт-Петербург</p>
                                    <p className={s.data}>
                                        Продает товары с августа 2021
                                    </p>
                                </div>
                                <ShowTelephone />
                            </div>
                        </div>
                        <h3 className={s.subtitle}>Товары продавца</h3>
                        <ProductList products={productsSeller} />
                    </div>
                </main>
            </div>
        </div>
    )
}
export default SellerProfile
