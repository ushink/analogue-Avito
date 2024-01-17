/* eslint-disable no-unused-vars */
import { pictures } from '../../../mock/pictures'
import s from './NewAdv.module.css'
import { useState, useRef, useEffect } from 'react'
import Button from '../../UI/Button/Button'
import {
    usePostImgAdsMutation,
    usePostTextAdsMutation
} from '../../../services/adsApi'
import { toast } from 'react-toastify'

function NewAdv({ setActive }) {
    const fileImage = useRef(null)

    const [textAds, { error: textError, isError: isTextError }] =
        usePostTextAdsMutation()
    const [imageAds, { error: imageError, isError: isImageError }] =
        usePostImgAdsMutation()

    const [isButtonActiv, setIsButtonActiv] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState([])

    // создать объявление
    const handleAddAds = async (event) => {
        console.log(image)
        event.preventDefault()
        setIsButtonActiv(true)

        // отправляем текст
        await textAds({ title, description, price })
            .unwrap()
            .then((response) => {
                if (image) {
                    for (let i = 0; i < image.length; i++) {
                        // отправляем картинку
                        imageAds({ image, id: response.id }).unwrap()
                    }
                }
            })

        // location.reload(true)
    }

    const handelChange = (event) => {
        if (event.length === 1) {
            setImage(event.target.files[0])
        } else {
            setImage(event.target.files)
        }
    }

    useEffect(() => {
        if (isTextError) {
            toast.error(textError.data.detail)
        }
        if (isImageError) {
            toast.error(imageError.data.detail)
        }
    }, [isTextError, isImageError])

    const handelPick = () => {
        fileImage.current.click()
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
            <form className={s.body} onSubmit={handleAddAds}>
                <div className={s.item}>
                    <label className={s.label}>Название</label>
                    <input
                        placeholder="Введите название"
                        className={s.inputTitle}
                        type="text"
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
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
                    ></textarea>
                </div>
                <div className={s.item}>
                    <input
                        className={s.hidden}
                        id="imgAds"
                        type="file"
                        multiple
                        accept="image/*,.png,.jpg,.gif,.web,"
                        ref={fileImage}
                        onChange={handelChange}
                    />
                    <label htmlFor="imgAds" className={s.label}>
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
                                onClick={handelPick}
                            />
                        ))}
                    </div>
                </div>
                <div className={s.item}>
                    <label className={s.label}>Цена</label>
                    <div className={s.price}>
                        <input
                            className={s.inputPrice}
                            placeholder="0"
                            type="number"
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                        />
                        <span className={s.currency}>₽</span>
                    </div>
                </div>
                <Button color={'gray'} type={'submit'} disabled={isButtonActiv}>
                    {'Опубликовать'}
                </Button>
            </form>
        </div>
    )
}

export default NewAdv
