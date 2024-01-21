import s from './SettingsAdv.module.css'
import { useEffect, useState } from 'react'
import Button from '../../UI/Button/Button'
import {
    usePostImgAdsMutation,
    useUpdateAdsMutation
} from '../../../services/adsApi'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import ChoiceFile from '../../ChoiceFile/ChoiceFile'
import DeleteFile from '../../DeleteFile/DeleteFile'

function SettingsAdv({ setActive, data }) {
    const { id } = useParams()

    const [updateAds, { isSuccess: isUpdateSuccess }] = useUpdateAdsMutation()
    const [imageAds, { isSuccess: isImagesSuccess }] = usePostImgAdsMutation()

    const [isButtonActiv, setIsButtonActiv] = useState(false)
    const [title, setTitle] = useState(data?.title)
    const [description, setDescription] = useState(data?.description)
    const [price, setPrice] = useState(data?.price)
    const [image, setImage] = useState([])

    // обновить объявление
    const handleUpdateAds = async (event) => {
        event.preventDefault()
        if (!title || !description || !price) {
            toast.error('Заполните все поля')
            return
        }

        setIsButtonActiv(true)

        try {
            await updateAds({ title, description, price, id })
                .unwrap()
                .then((response) => {
                    console.log(response)
                    if (image) {
                        for (let i = 0; i < image.length; i++) {
                            imageAds({
                                data: image[i],
                                id: response.id
                            }).unwrap()
                        }
                    }
                })
        } catch {
            toast.error('Error')
        }
        setActive(false)
    }

    useEffect(() => {
        if (isImagesSuccess || isUpdateSuccess) {
            location.reload(true)
        }
    }, [isImagesSuccess, isUpdateSuccess])

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
                {data?.images?.length !== 0 ? (
                    <DeleteFile data={data} id={id} />
                ) : (
                    <ChoiceFile image={image} setImage={setImage} />
                )}
                <div className={s.item}>
                    <label className={s.label}>Цена</label>
                    <div className={s.price}>
                        <input
                            className={s.inputPrice}
                            type="number"
                            min={0}
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                            value={price}
                        />
                        <span className={s.currency}>₽</span>
                    </div>
                </div>
                <Button
                    color={'btnAdv'}
                    type={'submit'}
                    disabled={isButtonActiv}
                >
                    {'Сохранить'}
                </Button>
            </form>
        </div>
    )
}

export default SettingsAdv
