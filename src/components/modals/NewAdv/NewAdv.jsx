/* eslint-disable no-unused-vars */
import { pictures } from '../../../mock/pictures'
import s from './NewAdv.module.css'
import { useState } from 'react'
import Button from '../../UI/Button/Button'

function NewAdv({ setActive }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    return (
        <div className={s.adv}>
            <div className={s.header}>
                <h1 className={s.title}>Новое объявление</h1>
                <div
                    className={s.cross}
                    onClick={() => {
                        setActive(false)
                    }}
                ></div>
            </div>
            <div className={s.body}>
                <form className={s.item}>
                    <label className={s.label}>Название</label>
                    <input
                        placeholder="Введите название"
                        className={s.inputTitle}
                        type="text"
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </form>
                <form className={s.item}>
                    <label className={s.label}>Описание</label>
                    <textarea
                        className={s.description}
                        placeholder="Введите описание"
                        type="text"
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    ></textarea>
                </form>
                <div className={s.item}>
                    <label className={s.label}>
                        Фотографии товара{' '}
                        <span className={s.select}>не более 5 фотографий</span>
                    </label>
                    <div className={s.boxImg}>
                        {pictures.map((el) => (
                            <img
                                className={s.img}
                                key={el.id}
                                src="../../img/card.svg"
                                alt="card"
                            />
                        ))}
                    </div>
                </div>
                <form className={s.item}>
                    <label className={s.label}>Цена</label>
                    <div className={s.price}>
                        <input
                            className={s.inputPrice}
                            type="number"
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                            value={price}
                        />
                        <span className={s.currency}>₽</span>
                    </div>
                </form>
            </div>
            <Button color={'gray'}>{'Опубликовать'}</Button>
        </div>
    )
}

export default NewAdv
