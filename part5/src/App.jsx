import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login'

import {
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { Container, AppBar, Toolbar, Button } from '@mui/material'

const BlogDetail = ({ blogs, updateBlog, deleteBlog, currentUser }) => {
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)
  
  if (!blog) {
    return <div>Blog not found</div>
  }
  
  return (
    <Blog
      blogs={blog}
      updateBlog={updateBlog}
      deleteBlog={deleteBlog}
      currentUser={currentUser}
    />
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON)
      setUser(userData)
      blogService.setToken(userData.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  const addBlog = blogObject => {
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  const refreshBlogs = () => {
    blogService.getAll().then(updatedBlogs => {
      setBlogs(updatedBlogs)
    })
  }

  const deleteBlog = (id) => {
    blogService.remove(id).then(() => {
      setBlogs(blogs.filter(n => n.id !== id))
    })
  }

  const updateBlog = (blogObject, id) => {
      blogService.update(blogObject, id)
        .then(refreshBlogs)
        .catch(() => showError('Failed to update blog'))
    }

  const showError = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const showSuccess = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      showSuccess(`Welcome ${loggedUser.name}!`)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      showError('wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.clearToken()
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const padding = {
    padding: 5
  }
  const hoverStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }
  return (
    <Container>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/" sx={hoverStyle}>notes</Button>
          <Button color="inherit" component={Link} to="/create" sx={hoverStyle}>new note</Button>
          <Button color="inherit" component={Link} to="/login" sx={hoverStyle}>login</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/blogs/:id" element={
          <BlogDetail
            blogs={blogs}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            currentUser={user}
          />
        } />
        <Route path="/" element={
          <BlogList blogs={blogs} user={user} />
        } />
        <Route path="/create" element={
          user ? <BlogForm createBlog={addBlog}/> : <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        } />
        <Route path="/login" element={
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        } />
      </Routes>
    </Container>
  )
}

export default App