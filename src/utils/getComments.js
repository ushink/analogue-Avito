const getComments = (comments, text) => {
    const n = Math.abs(comments?.length) % 100

    if (n === 0) {
        return text[3]
    }

    if (n > 10 && n < 20) {
        return `${n} ${text[2]}`
    }

    if (n % 10 > 1 && n % 10 < 5) {
        return `${n} ${text[1]}`
    }

    if (n % 10 === 1 || n === 1) {
        return `${n} ${text[0]}`
    }

    return `${n} ${text[2]}`
}

export default getComments
