import { useLocation, useNavigate, useParams } from 'react-router'
import s from './ShowTelephone.module.css'
import { MYADV_ROUTE } from '../../utils/constants'
import Button from '../UI/Button/Button'
import { useState } from 'react'
import Modal from '../UI/Modal/Modal'
import SettingsAdv from '../modals/SettingsAdv/SettingsAdv'
import { useDeleteAdsMutation } from '../../services/adsApi'

function ShowTelephone({ data }) {
    const { pathname } = useLocation()

    const navigate = useNavigate()

    const { id } = useParams()

    const [modalActive, setModalActive] = useState(false)
    const [phone, setPhone] = useState(false)

    const advPage =
        pathname.replace(`${id}`, '') === MYADV_ROUTE.replace(`:id`, '')

    const [deleteAds] = useDeleteAdsMutation()

    const handelDeleteAds = async (event) => {
        await deleteAds(event).then(() => navigate('/profile'))
        location.reload(true)
    }

    return (
        <>
            {!advPage ? (
                <>
                    <div className={s.box} onClick={() => setPhone(true)}>
                        <h4 className={s.title}>Показать телефон</h4>
                        <p className={s.number}>
                            {phone
                                ? data
                                : `${data?.substr(0, 4) + ' ХХХ ХХ ХХ'}`}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <Button
                        color={'custom'}
                        onClick={() => setModalActive(true)}
                    >
                        {'Редактировать'}
                    </Button>
                    <Button
                        color={'custom'}
                        onClick={() => handelDeleteAds(id)}
                    >
                        {'Снять с публикации'}
                    </Button>

                    <Modal active={modalActive} setActive={setModalActive}>
                        <SettingsAdv setActive={setModalActive} />
                    </Modal>
                </>
            )}
        </>
    )
}

export default ShowTelephone
