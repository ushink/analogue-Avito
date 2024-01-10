/* eslint-disable no-unused-vars */
import s from './Reviews.module.css'
import { useState } from 'react'
import Button from '../../UI/Button/Button'

function Reviews({ setActive }) {
    const [reviews, setReviews] = useState('')

    return (
        <div className={s.adv}>
            <div className={s.header}>
                <h1 className={s.title}>Отзывы о товаре</h1>
                <div
                    className={s.cross}
                    onClick={() => {
                        setActive(false)
                    }}
                ></div>
            </div>
            <div className={s.body}>
                <form className={s.item}>
                    <label className={s.label}>Добавить отзыв</label>
                    <textarea
                        className={s.reviews}
                        placeholder="Введите отзыв"
                        type="text"
                        onChange={(e) => {
                            setReviews(e.target.value)
                        }}
                    ></textarea>
                </form>
                <Button color={'gray'}>{'Опубликовать'}</Button>
            </div>
        </div>
    )
}

export default Reviews
