/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import s from './SettingsAdv.module.css'
import { useState } from 'react'
import Button from '../../UI/Button/Button'
import {
    useDeleteFileMutation,
    usePostImgAdsMutation,
    useUpdateAdsMutation
} from '../../../services/adsApi'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import ChoiceFile from '../../ChoiceFile/ChoiceFile'

function SettingsAdv({ setActive, data }) {
    const { id } = useParams()

    const [updateAds] = useUpdateAdsMutation()
    const [deleteFile] = useDeleteFileMutation()
    const [imageAds] = usePostImgAdsMutation()

    const [isButtonActiv, setIsButtonActiv] = useState(false)
    const [title, setTitle] = useState(data?.title)
    const [description, setDescription] = useState(data?.description)
    const [price, setPrice] = useState(data?.price)
    const [image, setImage] = useState([])

    // обновить объявление
    const handleUpdateAds = async (event) => {
        event.preventDefault()
        setIsButtonActiv(true)

        if (!title || !description || !price) {
            toast.error('Заполните все поля')
            return
        }

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
            setActive(false)
            // location.reload(true)
        } catch {
            toast.error('Error')
        }
    }

    // удалить изображение
    const handleDeleteFile = async (url) => {
        console.log(id)
        try {
            await deleteFile({ id: id, file_url: url })
        } catch (error) {
            toast.error('error')
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
                {data?.images?.length !== 0 ? (
                    <div className={s.item}>
                        <label className={s.label}>
                            Фотографии товара{' '}
                            <span className={s.select}>
                                не более 5 фотографий
                            </span>
                        </label>
                        <div className={s.boxImg}>
                            <>
                                {data?.images?.map((el) => (
                                    <div key={el.id}>
                                        <img
                                            className={s.img}
                                            src={`http://localhost:8090/${el.url}`}
                                            alt="card"
                                        />
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                handleDeleteFile(el.url)
                                                
                                            }}
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </>
                        </div>
                    </div>
                ) : (
                    <ChoiceFile image={image} setImage={setImage} />
                )}
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
                </div>
                <Button color={'gray'} type={'submit'} disabled={isButtonActiv}>
                    {'Сохранить'}
                </Button>
            </form>
        </div>
    )
}

export default SettingsAdv
