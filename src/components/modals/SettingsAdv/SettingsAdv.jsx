/* eslint-disable no-unused-vars */
import { pictures } from '../../../mock/pictures'
import s from './SettingsAdv.module.css'
import { useState } from 'react'
import Button from '../../UI/Button/Button'
import { useUpdateAdsMutation } from '../../../services/adsApi'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

function SettingsAdv({ setActive, data }) {
    const { id } = useParams()

    const [updateAds] = useUpdateAdsMutation()

    const [isButtonActiv, setIsButtonActiv] = useState(false)
    const [title, setTitle] = useState(data?.title)
    const [description, setDescription] = useState(data?.description)
    const [price, setPrice] = useState(data?.price)

    const handleUpdateAds = async (event) => {
        event.preventDefault()
        setIsButtonActiv(true)

        try {
            await updateAds({ title, description, price, id }).unwrap()
            // location.reload(true)
        } catch {
            toast.error('Error')
        }
    }

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
            <form className={s.body} onSubmit={handleUpdateAds}>
                <div className={s.item}>
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
                </div>
                <div className={s.item}>
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
                </div>
                <div className={s.item}>
                    <label className={s.label}>
                        Фотографии товара{' '}
                        <span className={s.select}>не более 5 фотографий</span>
                    </label>
                    <div className={s.boxImg}>
                        {data?.images.map((el) => (
                            <img
                                className={s.img}
                                key={el.id}
                                src={`http://localhost:8090/${data?.images?.url}`}
                                alt="card"
                            />
                        ))}
                    </div>
                </div>
                <div className={s.item}>
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
                    <Button
                        color={'gray'}
                        type={'submit'}
                        disabled={isButtonActiv}
                    >
                        {'Сохранить'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SettingsAdv
