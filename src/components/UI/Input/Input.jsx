import s from './Input.module.css'

export default function Input({ classes, ...props }) {
    const classesJoin = classes?.join(' ')

    return <input className={s.input + ' ' + classesJoin} {...props} />
}
