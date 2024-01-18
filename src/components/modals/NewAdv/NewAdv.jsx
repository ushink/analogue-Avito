import s from './NewAdv.module.css'
import { useState, useEffect } from 'react'
import Button from '../../UI/Button/Button'
import {
    usePostImgAdsMutation,
    usePostTextAdsMutation
} from '../../../services/adsApi'
import { toast } from 'react-toastify'
import ChoiceFile from '../../ChoiceFile/ChoiceFile'

function NewAdv({ setActive }) {
    const [
        textAds,
        { isSuccess: isTextAdsSuccess, error: textError, isError: isTextError }
    ] = usePostTextAdsMutation()
    const [imageAds, { error: imageError, isError: isImageError }] =
        usePostImgAdsMutation()

    const [isButtonActiv, setIsButtonActiv] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState([])

    // создать объявление
    const handleAddAds = async (event) => {
        event.preventDefault()
        setIsButtonActiv(true)

        await textAds({ title, description, price })
            .unwrap()
            .then((response) => {
                if (image) {
                    for (let i = 0; i < image.length; i++) {
                        // отправляем картинку
                        imageAds({ data: image[i], id: response.id }).unwrap()
                    }
                }
            })
        setActive(false)
    }

    useEffect(() => {
        if (isTextError) {
            toast.error(textError.data.detail)
        }
        if (isImageError) {
            toast.error(imageError.data.detail)
        }
    }, [isTextError, isImageError])

    useEffect(() => {
        if (isTextAdsSuccess) {
            toast.success('Ваше объявление добавлено')
        }
    }, [isTextAdsSuccess])

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
                <ChoiceFile image={image} setImage={setImage} />
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
