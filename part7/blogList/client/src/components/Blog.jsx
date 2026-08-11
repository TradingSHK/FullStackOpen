import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { useBlogActions } from '../blogStore'

const Blog = ({ blog, currentUser }) => {
  const navigate = useNavigate()
  const { incLikes, deleteOne } = useBlogActions()

  const canRemove = currentUser && currentUser.username === blog.user?.username

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <Card sx={{ mb: 1.5, borderRadius: 2, boxShadow: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Stack spacing={1.75}>
          <Stack direction="row" justifycontent="space-between" alignitems="flex-start" spacing={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              {blog.title} by {blog.author}
            </Typography>
            {canRemove && (
              <Button size="small" color="error" variant="outlined" onClick={() => {
                navigate("/")
                deleteOne(blog.id)}}
                >
                remove
              </Button>
            )}
          </Stack>

          <Typography variant="body2" color="text.secondary">
            URL: {blog.url}
          </Typography>

          <Stack direction="row" justifycontent="space-between" alignitems="center" spacing={1}>
            <Typography variant="body2">
              Created by {blog.user?.name || 'unknown'}
            </Typography>
            <Button size="small" variant="contained" onClick={() => incLikes(blog.id)}>
              like · {blog.likes}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Blog