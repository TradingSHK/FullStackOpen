import { create } from "zustand";
import loginService from './services/login'
import blogService from './services/blogs'


export const useUserStore = create((set, get) => ({  
    user: null, 
    username: '',
    password: '',
    actions: {
        login: async () => {
            const username = get().username
            const password = get().password
            const loggedUser = await loginService.login({username, password})
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
            blogService.setToken(loggedUser.token)
            set(state => ({ user: loggedUser }))
            set(state => ({username: ''}))
            set(state => ({password: ''}))
        },
        logout: () => {
            window.localStorage.removeItem('loggedBlogappUser')
            blogService.clearToken()
            set(state => ({ user: null }))
            set(state => ({username: ''}))
            set(state => ({password: ''}))
        },
        setUsername: (username) => {
            set(state => ({ username: username }))
        },
        setPassword: (password) => {
            set(state => ({ password: password }))
        },
        setUser: (user) =>  {
            set(state => ({ user: user }))
        }
    }
}))

export const useUser = () => useUserStore(state => state.user)
export const useUserActions = () => useUserStore(state => state.actions)