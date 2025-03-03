import { useState } from 'react'
import { Button, TextField } from '@mui/material';

const BlogForm = ({ createBlogAction }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlogAction({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <div><TextField id="title" label="Title" value={title} onChange={({ target }) => setTitle(target.value)} /></div>
      <div><TextField id="author" label="Author" value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
      <div><TextField id="url" label="URL" value={url} onChange={({ target }) => setUrl(target.value)} /></div>
      <Button variant="contained" size="small" type='submit'>
        create
      </Button>
    </form>
  )
}

export default BlogForm