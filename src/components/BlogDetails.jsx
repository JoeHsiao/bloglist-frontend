import { likeBlog, addComment } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'

const BlogDetails = () => {
  const id = useParams().id
  const blog = useSelector(state => {
    return state.blogs.find(x => x.id === id)
  })

  const dispatch = useDispatch()
  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleAddComment = async (event) => {
    event.preventDefault()
    const comment = event.target.commentInput.value
    event.target.commentInput.value = ''
    dispatch(addComment(id, comment))
  }

  if (!blog)
    return null
  const comments = blog.comments

  return (
    <div>
      <h3>{blog.title}</h3>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
      <div>added by {blog.author}</div>
      <h4>comments</h4>
      <form onSubmit={handleAddComment}>
        <input name='commentInput'></input><button type='submit'>add comment</button>
      </form>
      <ul>
        {comments.map(x => (
          <li key={nanoid()}>
            {x}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetails