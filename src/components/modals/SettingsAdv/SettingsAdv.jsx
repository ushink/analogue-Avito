/* eslint-disable no-unused-vars */
import { pictures } from '../../../mock/pictures'
import s from './SettingsAdv.module.css'
import { useState } from 'react'
import Button from '../../UI/Button/Button'

function NewAdv({ setActive }) {
    const [title, setTitle] = useState(
        'Ракетка для большого тенниса Triumph Pro STС Б/У'
    )
    const [description, setDescription] = useState(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    )
    const [price, setPrice] = useState(2200)

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
                        value={title}
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
                        value={description}
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
                <Button color={'gray'}>{'Сохранить'}</Button>
            </div>
        </div>
    )
}

export default NewAdv
