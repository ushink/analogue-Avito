import { Link, useLocation } from 'react-router-dom'
import s from './Seller.module.css'
import {
    ADV_ROUTE,
    PROFILE_ROUTE,
    SELLER_ROUTE
} from '../../../utils/constants'

function Seller() {
    const { pathname } = useLocation()

    const advPage = pathname.slice(0, -2) === ADV_ROUTE.slice(0, -4)

    return (
        <div className={s.seller}>
            <div className={s.photo}></div>
            {advPage ? (
                <div className={s.personal}>
                    <Link to={SELLER_ROUTE}>
                        <h3 className={s.name}>Кирилл</h3>
                    </Link>
                    <p className={s.data}>Продает товары с августа 2021</p>
                </div>
            ) : (
                <div className={s.personal}>
                    <Link to={PROFILE_ROUTE}>
                        <h3 className={s.name}>Антон</h3>
                    </Link>
                    <p className={s.data}>Продает товары с мая 2022</p>
                </div>
            )}
        </div>
    )
}

export default Seller
