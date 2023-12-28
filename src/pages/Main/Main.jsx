import s from './Main.module.css'
import Header from '../../components/common/Header/Header'
import ProductList from '../../components/product/ProductList/ProductList'
import Menu from '../../components/common/Menu/Menu'
import { productsAll } from '../../mock/products'

function Main() {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <main className={s.main}>
                    <Menu />
                    <div className={s.content}>
                        <h2 className={s.title}>Объявления</h2>
                        <ProductList products={productsAll} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Main
