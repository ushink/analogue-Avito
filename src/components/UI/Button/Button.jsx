import s from './Button.module.css'

function Button({ children, color, onClick, disabled }) {
    return (
        <button
            className={`${s.button} ${s[color]} ${disabled && s.disabled}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
