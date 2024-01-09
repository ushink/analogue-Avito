import s from './Modal.module.css'

function Modal({ active, setActive, children }) {
    return (
        <div
            className={active ? s.modalActive : s.modal}
            onClick={() => {
                setActive(false)
            }}
        >
            <div
                className={active ? s.contentActive : s.content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal
