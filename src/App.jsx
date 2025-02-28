import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationTemporarily, clear } from './reducers/notificationReducer'
import { initializeBlogs, clear as clearBlogs, create } from './reducers/blogsReducer'

const Notification = () => {
  const message = useSelector((state) => state.notification.content)
  const color = useSelector((state) => state.notification.color)
  if (!message)
    return null

  const notificationStyle = {
    border: `2px solid ${color}`,
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f0f0f0'
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      return
    }
    dispatch(initializeBlogs())
  }, [user])

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(clear())
    } catch (exception) {
      dispatch(setNotificationTemporarily('wrong username or password', '#FF0000', 0))
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    dispatch(clearBlogs())
  }

  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (error) {
        console.error('Error remove blog', error.message)
      }
    }
  }

  const createBlogAction = async (blogObj) => {
    blogFormRef.current.toggleVisible()

    const newBlog = await blogService.create(blogObj)
    dispatch(create(newBlog))
    dispatch(setNotificationTemporarily(`a new blog ${newBlog.title} by ${newBlog.author} added`, '#00FF00', 5))
  }

  const byLikes = (a, b) => b.likes - a.likes

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div> username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => { setUsername(target.value) }}
            />
          </div>
          <div> password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => { setPassword(target.value) }}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div >
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlogAction={createBlogAction} />
      </Togglable>

      {[...blogs].sort(byLikes).map(blog => {
        const isIdMatch = blog.user.username === user.username ? true : false
        return <Blog key={blog.id} blog={blog} showRemoveButton={isIdMatch} handleRemoveBlog={handleRemoveBlog} />
      })}
    </div>
  )
}

export default App