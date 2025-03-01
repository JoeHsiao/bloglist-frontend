import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const queryClient = useQueryClient()

  const blogMutation = useMutation({
    mutationFn: (blog) => {
      return blogService.create(blog)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    setTitle('')
    setAuthor('')
    setUrl('')
    blogMutation.mutate(newBlog)
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <div>title<input id='title' value={title} onChange={({ target }) => setTitle(target.value)}></input></div>
      <div>author<input id='author' value={author} onChange={({ target }) => setAuthor(target.value)}></input></div>
      <div>url<input id='url' value={url} onChange={({ target }) => setUrl(target.value)}></input></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm