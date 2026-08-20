import { create } from "zustand";
import blogService from './services/blogs'

export const useBlogStore = create((set, get) => ({
    blogs: [],
    actions: {
        add: async (blog) => {
            const newBlog = await blogService.create(blog)
            set(state => ({ blogs: state.blogs.concat(blog)}))
        },
        initialize: async() => {
            const blogs = await blogService.getAll()
            const sortedBlogs = blogs.toSorted((a,b) => b.likes - a.likes)
            set(state => ({ blogs: sortedBlogs }))
        },
        deleteOne: async (id) => {
            await blogService.remove(id)
            set(state => ({ blogs: state.blogs.filter(a => a.id !== id )}))
        },
        incLikes: async (id) => {
            const blog = get().blogs.find(a => a.id === id)
            const updated = await blogService.update(id, {...blog, likes: blog.likes + 1 })
            set(state => ({ blogs: state.blogs.map(a => a.id === id ? updated : a)}))
        },
        addComment: async(id, comment) => {           
            const blog = get().blogs.find(a => a.id === id)
            const updated = await blogService.addComment(id, blog, comment)            
            set(state => ({blogs: state.blogs.map(a => a.id === id ? updated : a)}))
        }
    }
}))

export const useBlogs = () => useBlogStore(state => state.blogs)
export const useBlogActions = () => useBlogStore(state => state.actions)