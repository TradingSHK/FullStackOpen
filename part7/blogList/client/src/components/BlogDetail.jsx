import { useParams } from 'react-router'
import Blog from './Blog'

const BlogDetail = ({ blogs, currentUser }) => {
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)
  
  if (!blog) {
    return <div>Blog not found</div>
  }
  
  return (
    <Blog
      blog={blog}
      currentUser={currentUser}
    />
  )
}

export default BlogDetail