const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    if(!body.title || !body.author || !body.url) {        
        return response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {  
    if(!request.user) {
        return response.status(401).json({ error: 'token missing' })
    }

    const blog = await Blog.findById(request.params.id)
    
    if(blog.user.toString() === request.user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({error: 'you are not allowed to delete this blog'})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const { author, title, likes, url } = request.body
    
    const blogToUpdate = await Blog.findById(request.params.id)
    if (!blogToUpdate) {
        return response.status(404).end()
    }

    blogToUpdate.author = author
    blogToUpdate.title = title
    blogToUpdate.likes = likes
    blogToUpdate.url = url

    const savedBlog = await blogToUpdate.save()
    response.status(200).json(savedBlog)
})

module.exports = blogsRouter