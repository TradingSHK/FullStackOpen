import { Link } from 'react-router'
import { useBlogs } from '../blogStore'

const BlogList = () => {
  const blogs = useBlogs()

  return (
    <div>
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