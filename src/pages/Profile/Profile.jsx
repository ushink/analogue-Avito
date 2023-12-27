import Header from '../../components/common/Header/Header'
import Menu from '../../components/common/Menu/Menu'
import s from './Profile.module.css'

function Profile() {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <main className={s.main}>
                    <Menu />
                </main>
            </div>
        </div>
    )
}

export default Profile
