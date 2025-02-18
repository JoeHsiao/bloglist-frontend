import { useState } from 'react'

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
      <div>title<input id='title' onChange={({ target }) => setTitle(target.value)}></input></div>
      <div>author<input id='author' onChange={({ target }) => setAuthor(target.value)}></input></div>
      <div>url<input id='url' onChange={({ target }) => setUrl(target.value)}></input></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm