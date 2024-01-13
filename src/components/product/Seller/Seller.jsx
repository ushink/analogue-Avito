import { Link, useLocation } from 'react-router-dom'
import s from './Seller.module.css'
import { ADV_ROUTE, PROFILE_ROUTE } from '../../../utils/constants'

function Seller({ data }) {
    const { pathname } = useLocation()

    const advPage = pathname.replace(`${data?.id}`, '') === ADV_ROUTE.replace(`:id`, '')

    return (
        <div className={s.seller}>
            <div className={s.photo}></div>
            {advPage ? (
                <div className={s.personal}>
                    <Link to={`/seller/${data?.user?.id}`}>
                        <h3 className={s.name}>{data?.user?.name}</h3>
                    </Link>
                    <p className={s.data}>
                        Продает товары с{' '}
                        {new Date(data?.user?.sells_from).toLocaleString('ru', {
                            dateStyle: 'long'
                        })}
                    </p>
                </div>
            ) : (
                <div className={s.personal}>
                    <Link to={PROFILE_ROUTE}>
                        <h3 className={s.name}>{data?.user?.name}</h3>
                    </Link>
                    <p className={s.data}>
                        Продает товары с{' '}
                        {new Date(data?.user?.sells_from).toLocaleString('ru', {
                            dateStyle: 'long'
                        })}
                    </p>
                </div>
            )}
        </div>
    )
}

export default Seller
