import s from './Button.module.css'

function Button({ children, color, onClick, disabled, type }) {
    return (
        <button
            className={`${s.button} ${s[color]} ${disabled && s.disabled}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button
