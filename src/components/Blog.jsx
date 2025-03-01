import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useQueryClient, useMutation } from '@tanstack/react-query'

const Blog = ({ blog, showRemoveButton, handleRemoveBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (blog.title === '555')
    console.log('blog reload', blog)
  const removeButtonStyle = {
    color: 'white',
    backgroundColor: 'blue',
    display: showRemoveButton ? '' : 'none'
  }

  const [showDetail, setShowDetail] = useState(false)

  const queryClient = useQueryClient()
  const blogMutation = useMutation({
    mutationFn: (blog) => {
      return blogService.update(blog)
    },
    onSuccess: () => {
      console.log('onSuccess')
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (err) => {
      console.error('Error liking the blog', err.message)
    }
  })

  const handleLike = () => {
    const oneMoreLike = { ...blog, likes: blog.likes + 1 }
    blogMutation.mutate(oneMoreLike)
  }

  return (
    <div>
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => { setShowDetail(!showDetail) }}>view</button>

      </div>
      {showDetail &&
        <div style={blogStyle}>
          <div>{blog.title}</div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.author}</div>
          <button style={removeButtonStyle} onClick={() => handleRemoveBlog(blog)}>remove</button>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  showRemoveButton: PropTypes.bool.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired
}

export default Blog