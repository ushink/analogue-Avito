import { toast } from 'react-toastify'
import s from './ChoiceFile.module.css'
import { useEffect, useRef, useState } from 'react'
import { pictures } from '../../mock/pictures'

function ChoiceFile({ image, setImage }) {
    const fileImage = useRef(null)

    const [imagePreview, setImagePreview] = useState([])

    const handelChange = (e) => {
        const { files } = e.target

        const validImageFiles = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            validImageFiles.push(file)
        }

        if (validImageFiles.length) {
            setImage(validImageFiles.slice(0, 5))
            return
        }

        toast.error('Selected images are not of valid type!')
    }

    const handelPick = () => {
        fileImage.current.click()
    }

    useEffect(() => {
        const imagePreview = []
        const fileReaders = []
        let isCancel = false

        if (image.length) {
            image.forEach((file) => {
                const fileReader = new FileReader()
                fileReaders.push(fileReader)
                fileReader.onload = (e) => {
                    const { result } = e.target
                    if (result) {
                        imagePreview.push(result)
                    }
                    if (imagePreview.length === image.length && !isCancel) {
                        setImagePreview(imagePreview)
                    }
                }
                fileReader.readAsDataURL(file)
            })
        }
        return () => {
            isCancel = true
            fileReaders.forEach((fileReader) => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }, [image])

    return (
        <div className={s.item}>
            <input
                id="imgAds"
                type="file"
                multiple
                hidden
                accept="image/*,.png,.jpg,.gif,.web,"
                ref={fileImage}
                onChange={handelChange}
            />
            <label htmlFor="imgAds" className={s.label}>
                Фотографии товара{' '}
                <span className={s.select}>не более 5 фотографий</span>
            </label>
            <div className={s.boxImg}>
                {imagePreview.length > 0 ? (
                    <div>
                        {imagePreview.map((image, idx) => {
                            return (
                                <img
                                    className={s.img}
                                    key={idx}
                                    src={image}
                                    alt="card"
                                />
                            )
                        })}
                        <button
                            className="btn"
                            onClick={() => setImagePreview([])}
                        >
                            x
                        </button>
                    </div>
                ) : (
                    <>
                        {pictures.map((el) => (
                            <img
                                className={s.img}
                                key={el.id}
                                src="../../img/card.svg"
                                alt="card"
                                onClick={handelPick}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default ChoiceFile
