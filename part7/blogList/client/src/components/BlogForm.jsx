import { useState } from 'react'
import { useNavigate } from 'react-router'
import { TextField, Button } from '@mui/material'
import { useBlogActions } from '../blogStore'


const BlogForm = () => {
  const { add } = useBlogActions()
  const navigate = useNavigate()

  const addBlog = async (e) => {
    e.preventDefault()
    await add({
      title: document.getElementById('title').value,
      author: document.getElementById('author').value, 
      url: document.getElementById('url').value
    })
    e.target.reset()
    navigate("/")
  }

  return(
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <TextField
          label="title"
          id="title"
        />
        <br/><br/>
        <TextField
          label="author"
          id="author"
        />
        <br/><br/>
        <TextField 
          label="url"
          id="url"
        />
        <br/>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>create</Button>
      </form>
    </div>
  )
}

export default BlogForm