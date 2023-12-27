import s from './ProductList.module.css'
import { products } from '../../../mock/products'

function ProductList() {
    return (
        <div className={s.products}>
            {products &&
                products.map((el) => (
                    <div className={s.product} key={el.id}>
                        <div className={s.productImg}></div>
                        <h3 className={s.productName}>{el.name}</h3>
                        <span className={s.productPrice}>{el.price}</span>
                        <p className={s.productCity}>{el.city}</p>
                        <p className={s.productData}>{el.data}</p>
                    </div>
                ))}
        </div>
    )
}

export default ProductList
