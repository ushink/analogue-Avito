/* eslint-disable no-unused-vars */
import s from './Reviews.module.css'
import { useState } from 'react'
import Button from '../../UI/Button/Button'
import { comments } from '../../../mock/comments'

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
                        className={s.inputReviews}
                        placeholder="Введите отзыв"
                        type="text"
                        onChange={(e) => {
                            setReviews(e.target.value)
                        }}
                    ></textarea>
                </form>
                <Button color={'gray'}>{'Опубликовать'}</Button>

                <div className={s.comments}>
                    {comments.map((el) => (
                        <div className={s.commentator} key={el.id}>
                            <div className={s.photo}></div>
                            <div className={s.personal}>
                                <h3 className={s.name}>
                                    {el.name}{' '}
                                    <span className={s.data}>{el.data}</span>
                                </h3>
                                <div className={s.box}>
                                    <h3 className={s.boxHeader}>Комментарий</h3>
                                    <p className={s.boxReview}>{el.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Reviews
