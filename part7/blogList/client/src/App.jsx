import { useState, useEffect } from 'react'
import BlogDetail from './components/BlogDetail'
import blogService from './services/blogs'
import loginService from './services/login'

import {
  Routes, Route, Link, useNavigate
} from 'react-router'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { Container, AppBar, Toolbar, Button } from '@mui/material'
import ErrorBoundary from './components/ErrorBoundary'
import { useSuccessNotification, useErrorNotification, useSuccessNotificationActions, useErrorNotificationActions } from './notificationStore'
import { useBlogActions, useBlogs } from './blogStore'
import { useUser, useUserActions, useUsers } from './userStore'
import persistentUserService from './services/persistentUser'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'

const App = () => {
  const blogs = useBlogs()
  const user = useUser()
  const users = useUsers()
  const { setUser, logout, getUsers } = useUserActions()
  const navigate = useNavigate()

  const successMessage = useSuccessNotification()
  const errorMessage = useErrorNotification()
  const { setSuccessMessage } = useSuccessNotificationActions()
  const { setErrorMessage } = useErrorNotificationActions()
  const { initialize } = useBlogActions()

  useEffect(() => {
    const loggedUserJSON = persistentUserService.getUser()
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON)
      setUser(userData)
      blogService.setToken(userData.token)
    }
  }, [])

  useEffect(() => {
    initialize()
    getUsers()
  },[initialize, getUsers])

  const padding = {
    padding: 5
  }
  const hoverStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }
  return (
    <Container>
      <Notification />
      
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/" sx={hoverStyle}>Blogs</Button>
          <Button color="inherit" component={Link} to="/users" sx={hoverStyle}>Users</Button>
          <Button color="inherit" component={Link} to="/create" sx={hoverStyle}>New Blog</Button>
          {user ? (
            <Button color="inherit" onClick={logout} sx={hoverStyle}>Logout</Button>
          ) : (
            <Button color="inherit" component={Link} to="/login" sx={hoverStyle}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <ErrorBoundary>
        <Routes>
          <Route path="/blogs/:id" element={
            <BlogDetail
              blogs={blogs}
              currentUser={user}
            />
          } />
          <Route path="/" element={
            <BlogList blogs={blogs} user={user} />
          } />
          <Route path="/create" element={
            user ? <BlogForm/> : <LoginForm/>
          } />
          <Route path="/login" element={
            <LoginForm/>
          } />
          <Route path="/users" element={
            <UserList/>
          }/>
          <Route path="/users/:id" element = {
            <UserDetail users={users}/>
          }/>
          <Route path="*" element={
              <div ref={() => { 
                throw new Error("404: The page you requested could not be found."); 
              }} />
            } 
          />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App