/* eslint-disable no-unused-vars */
import s from './Reviews.module.css'
import { useState } from 'react'
import Button from '../../UI/Button/Button'
import { usePostCommentsMutation } from '../../../services/adsApi'
import { toast } from 'react-toastify'
import { useAuthSelector } from '../../../store/slice/auth'

function Reviews({ setActive, comments, id }) {
    const { access } = useAuthSelector()

    const initialValue = ''

    const [reviews, setReviews] = useState(initialValue)

    const [comment, { error: commentError, isError: isCommentError }] =
        usePostCommentsMutation()

    // цепляет данные из input
    const handleChange = ({ target }) => {
        setReviews(target.value)
    }

    // оставить комментарий
    const handleAddPost = async () => {
        try {
            await comment({ id, text: reviews }).unwrap()
            setReviews(initialValue)
        } catch {
            if (isCommentError) {
                toast.error(commentError.data.detail)
            }
        }
    }

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
                        onChange={handleChange}
                    ></textarea>
                </form>
                <Button
                    color={!access ? 'gray' : 'btnReview'}
                    disabled={Boolean(!access)}
                    onClick={handleAddPost}
                >
                    {'Опубликовать'}
                </Button>

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
