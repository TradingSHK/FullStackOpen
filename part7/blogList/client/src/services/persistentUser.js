const getUser = () => {
    return window.localStorage.getItem("loggedBlogappUser")
}

const setUser = (loggedUser) => {
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(loggedUser))
}

const removeUser = () => {
    window.localStorage.removeItem("loggedBlogappUser")
}

export default {getUser, setUser, removeUser}