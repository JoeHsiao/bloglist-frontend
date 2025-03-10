import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author only', () => {
  const blogObj = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }

  render(<Blog blog={blogObj} showRemoveButton={false} handleRemoveBlog={() => (null)} />)
  const titleElement = screen.getByText('test title', { exact: false })
  const authorElement = screen.getByText('test author', { exact: false })
  const urlElement = screen.queryByAltText('test url', { exact: false })
  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeNull()
})

test('renders url and like in detail view', async () => {
  const blogObj = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }
  const user = userEvent.setup()
  const { container } = render(<Blog blog={blogObj} showRemoveButton={false} handleRemoveBlog={() => (null)} />)
  const button = screen.getByText('view')
  await user.click(button)

  const titleElement = screen.getByText('test title')
  const authorElement = screen.getByText('test author')
  const likesElement = screen.getByText('likes', { exact: false })
  const urlElement = screen.getByText('test url')
  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(likesElement).toBeDefined()
  expect(urlElement).toBeDefined()
})

test('event handler passed in being called', async () => {
  const blogObj = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }
  const mockHandler = vi.fn()
  const { container } = render(<Blog blog={blogObj} showRemoveButton={true} handleRemoveBlog={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const removeButton = screen.getByText('remove')
  await user.click(removeButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
})