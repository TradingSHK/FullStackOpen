const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)
let token
let userId

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({
        username: 'root',
        name: 'Root User',
        passwordHash
    })
    await user.save()
    userId = user._id
    
    const blogsWithUser = helper.initialBlogs.map(blog => ({
        ...blog,
        user: userId
    }))
    await Blog.insertMany(blogsWithUser)
    
    const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'secret' })
    
    token = loginResponse.body.token
})

test('returns the correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier is called id not _id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[0]);
    
    assert(response.body[0].hasOwnProperty('id'))
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'DoubleTest',
        author: 'Still Me',
        url: "doesnotexist.org",
        likes: 1000,
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    assert(contents.includes('DoubleTest'))
})

test('verify, that the likes property is missing and defaults to 0', async () => {
    const newBlog = {
        title: 'DoubleTest',
        author: 'Still Me',
        url: "doesnotexist.org",
    }

    const savedBlog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)   
    assert(savedBlog.body.likes === 0)
})

test('backend throws 400 if author is missing', async() => {
    const newBlog = {
        title: 'DoubleTest',
        url: "doesnotexist.org",
        likes: 1,
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('backend throws 400 if title is missing', async() => {
    const newBlog = {
        author: 'Still Me',
        url: "doesnotexist.org",
        likes: 1,
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('backend throws 400 if url is missing', async() => {
    const newBlog = {
        author: 'Still Me',
        title: 'DoubleTest',
        likes: 1,
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('delete a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const ids = blogsAtEnd.map(blog => blog.id)
    assert(!ids.includes(blogToDelete.id))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('update a blog', async() =>  {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
        author: blogToUpdate.author,
        title: blogToUpdate.title,
        likes: 12312,
        url: blogToUpdate.url,
    }

    const resultBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

    assert.strictEqual(resultBlog.body.likes, 12312)
    assert.strictEqual(resultBlog.body.id, blogToUpdate.id)
})


after(async () => {
    await mongoose.connection.close()
})