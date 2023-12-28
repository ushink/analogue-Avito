import Header from '../../components/common/Header/Header'
import Menu from '../../components/common/Menu/Menu'
import ProductList from '../../components/product/ProductList/ProductList'
import { productsUser } from '../../mock/products'
import s from './Profile.module.css'

function Profile() {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <main className={s.main}>
                    <Menu />
                    <div className={s.content}>
                        <h2 className={s.title}>Здравствуйте, Антон!</h2>

                        <ProductList products={productsUser}/>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Profile
