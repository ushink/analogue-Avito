import { useLocation } from 'react-router'
import s from './ShowTelephone.module.css'
import { MYADV_ROUTE } from '../../utils/constants'
import Button from '../UI/Button/Button'
import { useState } from 'react'
import Modal from '../UI/Modal/Modal'
import SettingsAdv from '../modals/SettingsAdv/SettingsAdv'

function ShowTelephone() {
    const { pathname } = useLocation()

    const [modalActive, setModalActive] = useState(false)

    const advPage = pathname.slice(0, -2) === MYADV_ROUTE.slice(0, -4)

    return (
        <>
            {!advPage ? (
                <div className={s.box}>
                    <h4 className={s.title}>Показать телефон</h4>
                    <p className={s.number}>8 905 ХХХ ХХ ХХ</p>
                </div>
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
                        onClick={() => alert('В процессе разработки')}
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
