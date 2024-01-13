import { useNavigate } from 'react-router'
import s from './ProductList.module.css'

function ProductList({ ads, isProfilePage }) {
    const navigate = useNavigate()
    return (
        <div className={s.products}>
            {ads &&
                ads.map((el) => (
                    <div
                        className={s.product}
                        key={el.id}
                        onClick={() =>
                            isProfilePage
                                ? navigate(`/profile/adv/${el.id}`)
                                : navigate(`/adv/${el.id}`)
                        }
                    >
                        {el.images.length !== 0 ? (
                            <img
                                className={s.productImg}
                                src={`http://localhost:8090/${el.images[0]?.url}`}
                                alt="img"
                            />
                        ) : (
                            <>
                                <div className={s.productImg}></div>
                            </>
                        )}

                        <h3 className={s.productName}>{el.title}</h3>
                        <span className={s.productPrice}>
                            {el.price}&nbsp;₽
                        </span>
                        <p className={s.productCity}>{el.user.city}</p>
                        <p className={s.productData}>
                            {new Date(el.created_on).toLocaleString('ru', {
                                addSuffix: true
                            })}
                        </p>
                    </div>
                ))}
        </div>
    )
}

export default ProductList
