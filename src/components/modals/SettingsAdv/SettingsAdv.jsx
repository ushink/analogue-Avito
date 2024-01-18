/* eslint-disable no-unused-vars */
import { pictures } from '../../../mock/pictures'
import s from './SettingsAdv.module.css'
import { useRef, useState } from 'react'
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
    const navigate = useNavigate()
    const { id } = useParams()

    // console.log(data)
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
        try {
            await updateAds({ title, description, price, id })
                .unwrap()
                .then((response) => {
                    console.log(response)
                    if (image) {
                        for (let i = 0; i < image.length; i++) {
                            // отправляем картинку
                            imageAds({
                                data: image[i],
                                id: response.id
                            }).unwrap()
                        }
                    } 
                })
            // setActive(false)
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
                {data?.images.length !== 0 ? (
                    <div className={s.item}>
                        <label className={s.label}>
                            Фотографии товара{' '}
                            <span className={s.select}>
                                не более 5 фотографий
                            </span>
                        </label>
                        <div className={s.boxImg}>
                            <>
                                {data?.images.map((el, i) => (
                                    <img
                                        className={s.img}
                                        key={el.id}
                                        src={`http://localhost:8090/${data?.images?.[i]?.url}`}
                                        alt="card"
                                    />
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
