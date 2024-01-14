/* eslint-disable no-unused-vars */
import s from './Reviews.module.css'
import { useState } from 'react'
import Button from '../../UI/Button/Button'

function Reviews({ setActive, comments }) {
    const user = JSON.parse(localStorage.getItem('user') || null)

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
                    <Button
                        color={!user ? 'gray' : 'btnReview'}
                        disabled={Boolean(!user)}
                    >
                        {'Опубликовать'}
                    </Button>
                </form>

                <div className={s.comments}>
                    {comments &&
                        comments.map((el) => (
                            <div className={s.commentator} key={el?.id}>
                                <img
                                    className={s.photo}
                                    src={`http://localhost:8090/${el?.author?.avatar}`}
                                    alt="img"
                                />
                                <div className={s.personal}>
                                    <h3 className={s.name}>
                                        {el?.author?.name}
                                        <span className={s.data}>
                                            {new Date(
                                                el?.created_on
                                            ).toLocaleString('ru', {
                                                dateStyle: 'long',
                                                timeStyle: 'short'
                                            })}
                                        </span>
                                    </h3>
                                    <div className={s.box}>
                                        <h3 className={s.boxHeader}>
                                            Комментарий
                                        </h3>
                                        <p className={s.boxReview}>
                                            {el?.text}
                                        </p>
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
