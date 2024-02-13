import { useNavigate } from 'react-router'
import s from './MenuMob.module.css'
import { MAIN_ROUTE, PROFILE_ROUTE } from '../../../utils/constants'

function MenuMob() {
    const navigate = useNavigate()
    return (
        <footer className={s.footer}>
            <div className={s.buttons}>
                <div className={s.homeMob} onClick={() => navigate(MAIN_ROUTE)}>
                    <img src="../../img/homeMob.svg" alt="homeImg" />
                </div>
                <div className={s.addMob}>
                    <img src="../../img/addMob.svg" alt="addImg" />
                </div>
                <div
                    className={s.profileMob}
                    onClick={() => navigate(PROFILE_ROUTE)}
                >
                    <img src="../../img/profileMob.svg" alt="profileImg" />
                </div>
            </div>
        </footer>
    )
}

export default MenuMob
