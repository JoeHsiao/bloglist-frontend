import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { initializeBlogs, create } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import { setNotificationTemporarily } from '../reducers/notificationReducer'
import { TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material'
import Paper from '@mui/material/Paper'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()
  const user = useSelector(state => state.signInUser)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      return
    }
    dispatch(initializeBlogs())
  }, [user])

  const createBlogAction = async (blogObj) => {
    blogFormRef.current.toggleVisible()

    const newBlog = await blogService.create(blogObj)
    dispatch(create(newBlog))
    dispatch(setNotificationTemporarily(`a new blog ${newBlog.title} by ${newBlog.author} added`, '#00FF00', 5))
  }

  const byLikes = (a, b) => b.likes - a.likes
  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlogAction={createBlogAction} />
      </Togglable>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="blog table">
          <TableBody>
            {[...blogs].sort(byLikes).map(blog => {
              const isIdMatch = blog.user.username === user.username ? true : false
              return (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Blog key={blog.id} blog={blog} showRemoveButton={isIdMatch} />
                  </TableCell>
                  <TableCell>
                    {blog.author}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default BlogList