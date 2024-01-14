import s from './Adv.module.css'
import ShowTelephone from '../../components/ShowTelephone/ShowTelephone'
import Header from '../../components/common/Header/Header'
import Menu from '../../components/common/Menu/Menu'
import Modal from '../../components/UI/Modal/Modal'
import Reviews from '../../components/modals/Reviews/Reviews'
import Seller from '../../components/product/Seller/Seller'
import { useState } from 'react'
import { useParams } from 'react-router'
import { useGetAdsIdQuery, useGetCommentsQuery } from '../../services/adsApi'
import getComments from '../../utils/getComments'

function Adv() {
    const [modalActive, setModalActive] = useState(false)

    const { id } = useParams()

    const { data: adsIdData } = useGetAdsIdQuery(id)
    const { data: commentsData } = useGetCommentsQuery(id)

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <main className={s.main}>
                    <Menu />
                    <div className={s.content}>
                        <div className={s.product}>
                            <div className={s.pictures}>
                                <div className={s.big}>
                                    <img
                                        className={s.bigImg}
                                        src={`http://localhost:8090/${adsIdData?.images[0]?.url}`}
                                        alt="img"
                                    />
                                </div>
                                <div className={s.allImg}>
                                    {adsIdData?.images?.map((el) => (
                                        <div
                                            className={s.small}
                                            key={Math.random()}
                                        >
                                            <img
                                                className={s.smallImg}
                                                src={`http://localhost:8090/${el.url}`}
                                                alt="img"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={s.basicInfo}>
                                <h2 className={s.title}>{adsIdData?.title}</h2>
                                <p className={s.time}>
                                    {new Date(
                                        adsIdData?.created_on
                                    ).toLocaleString('ru', {
                                        dateStyle: 'long',
                                        timeStyle: 'short'
                                    })}
                                </p>
                                <p className={s.city}>
                                    {adsIdData?.user?.city}
                                </p>
                                <h4
                                    className={s.reviews}
                                    onClick={() => setModalActive(true)}
                                >
                                    {getComments(commentsData, [
                                        'отзыв',
                                        'отзыва',
                                        'отзывов',
                                        'Оставить отзыв'
                                    ])}
                                </h4>
                                <h2 className={s.price}>
                                    {adsIdData?.price} ₽
                                </h2>
                                <ShowTelephone data={adsIdData} />
                                <Seller data={adsIdData} />
                            </div>
                        </div>
                        <div className={s.description}>
                            <h2 className={s.subtitle}>Описание товара</h2>
                            <p className={s.info}>{adsIdData?.description}</p>
                        </div>
                    </div>
                </main>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <Reviews setActive={setModalActive} comments={commentsData}/>
            </Modal>
        </div>
    )
}

export default Adv
