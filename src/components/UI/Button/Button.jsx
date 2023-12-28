import s from './Button.module.css'

function Button({ children, color, onClick, isDone = false }) {
    return (
        <button
            className={`${s.button} ${s[color]} ${isDone && s.disabled}`}
            onClick={onClick}
            disabled={isDone}
        >
            {children}
        </button>
    )
}

export default Button
