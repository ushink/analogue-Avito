import { toast } from 'react-toastify'
import s from './DeleteFile.module.css'
import { useDeleteFileMutation } from '../../services/adsApi'

function DeleteFile({ data, id }) {

    const [deleteFile] = useDeleteFileMutation()

    // удалить изображение
    const handleDeleteFile = async (url) => {
        try {
            await deleteFile({ id: id, file_url: url }).unwrap()
        } catch (error) {
            toast.error('error')
        }
    }
    return (
        <div className={s.item}>
            <label className={s.label}>
                Фотографии товара{' '}
                <span className={s.select}>не более 5 фотографий</span>
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
    )
}

export default DeleteFile
