import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetail, setShowDetail] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async () => {
    console.log(blog)
    const oneMoreLike = { id: blog.id, likes: blog.likes + 1 }
    try {
      const newBlog = await blogService.update(oneMoreLike)
      console.log("newBlog", newBlog)
      setLikes(newBlog.likes)
    } catch (error) {
      console.error('Error liking the blog')
    }
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
          <div>likes {likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.author}</div>
        </div>
      }
    </div>
  )
}

export default Blog