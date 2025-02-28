import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, showRemoveButton, handleRemoveBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    color: 'white',
    backgroundColor: 'blue',
    display: showRemoveButton ? '' : 'none'
  }

  const [showDetail, setShowDetail] = useState(false)

  const dispatch = useDispatch()

  const handleLike = async () => {
    dispatch(likeBlog(blog))
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