import { likeBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// import { deleteBlog } from '../reducers/blogsReducer'

const BlogDetails = () => {
  const id = useParams().id
  const blog = useSelector(state => {
    return state.blogs.find(x => x.id === id)
  })

  const dispatch = useDispatch()

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  // const handleRemoveBlog = async (blog) => {
  //   if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
  //     dispatch(deleteBlog(blog))
  //   }
  // }

  // const removeButtonStyle = {
  //   color: 'white',
  //   backgroundColor: 'blue',
  //   // display: showRemoveButton ? '' : 'none'
  // }

  if (!blog)
    return null

  return (
    <div>
      <h3>{blog.title}</h3>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
      <div>added by {blog.author}</div>
      {/* <button style={removeButtonStyle} onClick={() => handleRemoveBlog(blog)}>remove</button> */}
    </div>
  )
}

export default BlogDetails