function getHeader() {
    return {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export {
    getHeader
}