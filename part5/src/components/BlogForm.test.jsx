import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const title = screen.getByLabelText('title:')
    const author = screen.getByLabelText('author:')
    const url = screen.getByLabelText('url:')

    const sendButton = screen.getByText('create')

    await user.type(title, "Test")
    await user.type(author, "Test McTest")
    await user.type(url, "test.org")
    await user.click(sendButton)
    
    expect(createBlog.mock.calls[0][0]).toStrictEqual({title: 'Test', author: 'Test McTest', url: 'test.org'})
})