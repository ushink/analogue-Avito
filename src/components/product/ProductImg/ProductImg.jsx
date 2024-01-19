import s from './ProductImg.module.css'

function ProductImg({ data }) {
    return (
        <div className={s.pictures}>
            <div className={s.big}>
                {data?.images[0]?.url ? (
                    <img
                        className={s.bigImg}
                        src={`http://localhost:8090/${data?.images[0]?.url}`}
                        alt="img"
                    />
                ) : (
                    <img
                        className={s.noPhoto}
                        src="../../img/noPhoto.png"
                        alt="no img"
                    />
                )}
            </div>
            {data?.images[0]?.url && (
                <div className={s.allImg}>
                    {data?.images?.map((el) => (
                        <div className={s.small} key={Math.random()}>
                            <img
                                className={s.smallImg}
                                src={`http://localhost:8090/${el.url}`}
                                alt="img"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductImg
