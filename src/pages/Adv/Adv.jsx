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
import ProfileButton from '../../components/ProfileButton/ProfileButton'
import { useAuthSelector } from '../../store/slice/auth'
import ProductImg from '../../components/product/ProductImg/ProductImg'

function Adv() {
    const [modalActive, setModalActive] = useState(false)

    const { id } = useParams()

    const { data: adsIdData } = useGetAdsIdQuery(id)
    const { data: commentsData } = useGetCommentsQuery(id)

    const { email } = useAuthSelector()

    const isProfileBtn = email === adsIdData?.user?.email

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <main className={s.main}>
                    <Menu />
                    <div className={s.content}>
                        <div className={s.product}>
                            <ProductImg data={adsIdData} />
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
                                {adsIdData?.user?.phone && !isProfileBtn && (
                                    <ShowTelephone
                                        phoneData={adsIdData?.user?.phone}
                                    />
                                )}
                                {isProfileBtn && <ProfileButton />}
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
                <Reviews
                    setActive={setModalActive}
                    comments={commentsData}
                    id={id}
                />
            </Modal>
        </div>
    )
}

export default Adv
