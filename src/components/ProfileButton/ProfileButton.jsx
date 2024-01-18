import { useState } from 'react'
import Button from '../UI/Button/Button'
import Modal from '../UI/Modal/Modal'
import SettingsAdv from '../modals/SettingsAdv/SettingsAdv'
import { useDeleteAdsMutation } from '../../services/adsApi'
import { useNavigate, useParams } from 'react-router'

function ProfileButton({data}) {
    const navigate = useNavigate()

    const { id } = useParams()

    const [modalActive, setModalActive] = useState(false)

    const [deleteAds] = useDeleteAdsMutation()

    const handelDeleteAds = async (event) => {
        await deleteAds(event).then(() => navigate('/profile'))
        location.reload(true)
    }

    return (
        <>
            <Button color={'custom'} onClick={() => setModalActive(true)}>
                {'Редактировать'}
            </Button>
            <Button color={'custom'} onClick={() => handelDeleteAds(id)}>
                {'Снять с публикации'}
            </Button>

            <Modal active={modalActive} setActive={setModalActive}>
                <SettingsAdv setActive={setModalActive} data={data}/>
            </Modal>
        </>
    )
}

export default ProfileButton
