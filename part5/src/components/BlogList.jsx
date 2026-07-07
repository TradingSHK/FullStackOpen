import { useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from './Notification'

const BlogList = ({ blogs, user }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const sortBlogs = blogs => {
    blogs.sort((a,b) => b.likes - a.likes)
  }

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
    <ul>
        {blogs.map(blog => (
        <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
        ))}
    </ul>
    </div>
  )
}

export default BlogList