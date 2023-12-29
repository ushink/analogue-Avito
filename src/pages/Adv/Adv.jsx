import s from './Adv.module.css'
import { Link } from 'react-router-dom'
import ShowTelephone from '../../components/ShowTelephone/ShowTelephone'
import Header from '../../components/common/Header/Header'
import Menu from '../../components/common/Menu/Menu'
import { pictures } from '../../mock/pictures'
import { SELLER_ROUTE } from '../../utils/constants'

function Adv() {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <main className={s.main}>
                    <Menu />
                    <div className={s.content}>
                        <div className={s.product}>
                            <div className={s.pictures}>
                                <div className={s.big}></div>
                                <div className={s.allImg}>
                                    {pictures.map((el) => (
                                        <div
                                            className={s.small}
                                            key={el.id}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className={s.basicInfo}>
                                <h2 className={s.title}>
                                    Ракетка для большого тенниса Triumph Pro STС
                                    Б/У
                                </h2>
                                <p className={s.time}>Сегодня в 10:45</p>
                                <p className={s.city}>Санкт-Петербург</p>
                                <h4 className={s.reviews}>23 отзыва</h4>
                                <h2 className={s.price}>2 200 ₽</h2>
                                <ShowTelephone />
                                <div className={s.seller}>
                                    <div className={s.photo}></div>
                                    <div className={s.personal}>
                                        <Link to={SELLER_ROUTE}>
                                            <h3 className={s.name}>Кирилл</h3>
                                        </Link>
                                        <p className={s.data}>
                                            Продает товары с августа 2021
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.description}>
                            <h2 className={s.subtitle}>Описание товара</h2>
                            <p className={s.info}>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Dignissimos doloribus nostrum
                                doloremque consequuntur ipsa fuga! A soluta
                                aliquid qui? Vel alias autem dolor commodi et,
                                magnam aspernatur consectetur atque voluptatum?
                                Nulla, aliquam optio minima omnis dolore fuga
                                amet! Quo sint rem saepe labore, assumenda omnis
                                animi quis eius, quos ipsam rerum ab totam amet
                                impedit possimus mollitia tempora non. Culpa!
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Adv
