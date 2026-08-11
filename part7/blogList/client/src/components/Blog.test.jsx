import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog information and likes are displayed to unauthenticated users, buttons are not displayed', async () => {
    const blog = {
        author: "Test",
        title: "TestTest",
        url: "test.com",
        likes: 5,
        user: { name: "Test User", username: "creator" }
    }

    render(<Blog blogs={blog} />)

    // Title and author shown initially
    expect(screen.getByText("title: TestTest, author: Test")).toBeInTheDocument()

    // View button should be shown
    const viewButton = screen.getByRole('button', { name: 'view' })
    expect(viewButton).toBeInTheDocument()

    // Click view to show details
    const user = userEvent.setup()
    await user.click(viewButton)

    // URL and likes should be visible
    expect(screen.getByText(/url: test.com/)).toBeInTheDocument()
    expect(screen.getByText(/likes: 5/)).toBeInTheDocument()

    // Like and remove buttons should NOT be shown
    expect(screen.queryByRole('button', { name: 'like' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
})

test('authenticated users who are not the blog creator are shown only the like button', async () => {
    const blog = {
        author: "Test",
        title: "TestTest",
        url: "test.com",
        likes: 5,
        user: { name: "Test User", username: "creator" },
        id: '123'
    }

    const otherUser = { username: 'other-user' }
    const mockHandler = vi.fn()

    render(<Blog blogs={blog} currentUser={otherUser} updateBlog={mockHandler} />)

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'view' }))

    // Like button should be shown
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()

    // Remove button should NOT be shown
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()

    // Like button should work
    await user.click(screen.getByRole('button', { name: 'like' }))
    expect(mockHandler).toHaveBeenCalledTimes(1)
})

test('blog creator is shown both like and delete buttons', async () => {
    const blog = {
        author: "Test",
        title: "TestTest",
        url: "test.com",
        likes: 5,
        user: { name: "Test User", username: "creator" },
        id: '123'
    }

    const creatorUser = { username: 'creator' }
    const mockUpdateHandler = vi.fn()
    const mockDeleteHandler = vi.fn()

    render(<Blog blogs={blog} currentUser={creatorUser} updateBlog={mockUpdateHandler} deleteBlog={mockDeleteHandler} />)

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'view' }))

    // Both like and remove buttons should be shown
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'remove' })).toBeInTheDocument()

    // Test like button works
    await user.click(screen.getByRole('button', { name: 'like' }))
    expect(mockUpdateHandler).toHaveBeenCalled()
})

test('like button clicked multiple times registers all clicks', async () => {
    const blog = {
        author: "Test",
        title: "TestTest",
        url: "test.com",
        likes: 0,
        user: { name: "Test User" },
        id: '123'
    }

    const mockHandler = vi.fn()

    render(<Blog blogs={blog} updateBlog={mockHandler} />)

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'view' }))

    await user.click(screen.getByRole('button', { name: 'like' }))
    await user.click(screen.getByRole('button', { name: 'like' }))

    expect(mockHandler).toHaveBeenCalledTimes(2)
})
