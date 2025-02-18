import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('creat a new blog with proper fields', async () => {
    const mockHandler = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlogAction={mockHandler} />)

    const titleInput = container.querySelector('#title')
    await user.type(titleInput, 'testing title')

    const authorInput = container.querySelector('#author')
    await user.type(authorInput, 'testing author')

    const urlInput = container.querySelector('#url')
    await user.type(urlInput, 'testing url')

    const submitButton = await screen.findByText('create')
    await user.click(submitButton)

    expect(mockHandler.mock.calls[0][0]).toStrictEqual({
        title: 'testing title',
        author: 'testing author',
        url: 'testing url'
    })
})