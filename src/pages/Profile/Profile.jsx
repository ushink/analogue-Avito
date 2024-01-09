import Header from '../../components/common/Header/Header'
import Menu from '../../components/common/Menu/Menu'
import ProductList from '../../components/product/ProductList/ProductList'
import { formInfo } from '../../mock/formInfo'
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
                        <div className={s.profile}>
                            <h3 className={s.titleProfile}>
                                Настройки профиля
                            </h3>
                            <div className={s.box}>
                                <div className={s.avatar}>
                                    <div className={s.foto}></div>
                                    <button className={s.btnChange}>
                                        Заменить
                                    </button>
                                </div>
                                <form className={s.form} action="#">
                                    {formInfo.map((el) => (
                                        <div className={s.item} key={el.id}>
                                            <label className={s.label}>
                                                {el.label}
                                            </label>
                                            <input
                                                className={
                                                    el.type === 'tel'
                                                        ? s.inputTel
                                                        : s.input
                                                }
                                                type={el.type}
                                                placeholder={el.placeholder}
                                            />
                                        </div>
                                    ))}
                                    <button className={s.btnSave}>
                                        Сохранить
                                    </button>
                                </form>
                            </div>
                        </div>
                        <h3 className={s.titleProfile}>Мои товары</h3>
                        <ProductList products={productsUser} isProfilePage={true}/>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Profile
