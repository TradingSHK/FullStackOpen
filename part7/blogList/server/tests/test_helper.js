const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "Test",
    "author": "me, myself and I",
    "url": "testme.testme",
    "likes": 1,
  },
  {
    "title": "this shit works",
    "author": "me, myself and I",
    "url": "IamAwesome.com",
    "likes": 121,
  }
]

const initialUsers = [
  {
    "username": "root",
    "password": "secret"
  }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {initialBlogs, blogsInDb, initialUsers, usersInDb}