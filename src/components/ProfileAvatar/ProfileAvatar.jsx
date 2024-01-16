import s from './ProfileAvatar.module.css'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import { usePostAvatarMutation } from '../../services/userApi'

function ProfileAvatar({ formInfo }) {
    const [avatar, { isError, error }] = usePostAvatarMutation()

    const fileAvatart = useRef(null)

    const handelUpload = async (file) => {
        if (!file) {
            toast.info('Please select a file')
            return
        }

        try {
            await avatar(file).unwrap()
        } catch {
            if (isError) {
                toast.error(error.data.detail)
            }
        }
    }

    const handelChange = (event) => {
        handelUpload(event.target.files[0])
    }

    // подмена клика
    const handelPick = () => {
        fileAvatart.current.click()
    }

    return (
        <div className={s.avatar}>
            <input
                className={s.hidden}
                id="inputAvatar"
                type="file"
                accept="image/*,.png,.jpg,.gif,.web,"
                ref={fileAvatart}
                onChange={handelChange}
            />
            <label htmlFor="inputAvatar" className={s.label}>
                {formInfo?.avatar ? (
                    <img
                        className={s.foto}
                        src={`http://localhost:8090/${formInfo?.avatar}`}
                        alt="avatar"
                    />
                ) : (
                    <img
                        className={s.foto}
                        src="../img/defaultAvatar.jpg"
                        alt="defaultAvatar"
                    />
                )}
            </label>
            <button className={s.btnChange} onClick={handelPick}>
                Изменить
            </button>
        </div>
    )
}

export default ProfileAvatar
