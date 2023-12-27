import Header from '../../components/common/Header/Header'
import s from './Profile.module.css'

function Profile() {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
            </div>
        </div>
    )
}

export default Profile
