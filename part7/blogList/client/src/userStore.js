import { create } from "zustand";
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import persistentUserService from './services/persistentUser'


export const useUserStore = create((set, get) => ({  
    user: null, 
    users: [],
    username: '',
    password: '',
    actions: {
        login: async () => {
            const username = get().username
            const password = get().password
            const loggedUser = await loginService.login({username, password})            
            persistentUserService.setUser(loggedUser)
            blogService.setToken(loggedUser.token)
            set(state => ({ user: loggedUser }))
            set(state => ({ username: ''}))
            set(state => ({ password: ''}))           
            return loggedUser
        },
        logout: () => {            
            persistentUserService.removeUser()
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
        },
        getUsers: async () => {
            const allUsers = await userService.getAllUsers()
            set(state => ({ users: allUsers }))
        }
    }
}))

export const useUser = () => useUserStore(state => state.user)
export const useUsers = () => useUserStore(state => state.users)
export const useUserActions = () => useUserStore(state => state.actions)