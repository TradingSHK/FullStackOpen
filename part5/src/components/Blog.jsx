import { Button, Card, CardContent, Stack, Typography } from '@mui/material'

const Blog = ({ blogs, updateBlog, deleteBlog, currentUser }) => {
  const blog = blogs

  const changeBlog = event => {
    event.preventDefault()
    updateBlog({
      user: blog.user.name,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
  }

  const removeBlog = event => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const canRemove = currentUser && currentUser.username === blog.user?.username

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <Card sx={{ mb: 1.5, borderRadius: 2, boxShadow: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Stack spacing={1.75}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              {blog.title} by {blog.author}
            </Typography>
            {canRemove && (
              <Button size="small" color="error" variant="outlined" onClick={removeBlog}>
                remove
              </Button>
            )}
          </Stack>

          <Typography variant="body2" color="text.secondary">
            URL: {blog.url}
          </Typography>

          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Typography variant="body2">
              Created by {blog.user?.name || 'unknown'}
            </Typography>
            <Button size="small" variant="contained" onClick={changeBlog}>
              like · {blog.likes}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Blog