import s from './Main.module.css'
import Header from '../../components/common/Header/Header'
import ProductList from '../../components/product/ProductList/ProductList'
import Form from '../../components/common/Form/Form'

function Main() {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <main className={s.main}>
                    <div className={s.search}>
                        <img
                            className={s.img}
                            src="./img/Logo.svg"
                            alt="logo"
                        />
                        <Form />
                    </div>
                    <div className={s.containerMain}>
                        <h2 className={s.title}>Объявления</h2>
                        <ProductList />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Main
