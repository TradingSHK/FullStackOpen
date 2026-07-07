import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'


const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const navigate = useNavigate()

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    navigate("/")
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
      <TextField
        label="title"
        value={newTitle}
        onChange={event => setNewTitle(event.target.value)}
      />
      <br/><br/>
      <TextField
        label="author"
        value={newAuthor}
        onChange={event => setNewAuthor(event.target.value)}
      />
      <br/><br/>
      <TextField 
        label="url"
        value={newUrl}
        onChange={event => setNewUrl(event.target.value)}
      />
      <br/>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>create</Button>
      </form>
    </div>
  )
}

export default BlogForm