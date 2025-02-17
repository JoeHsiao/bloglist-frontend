import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'

const Notification = ({ message, color }) => {
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
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const sortBlogs = async () => {
      const blog = await blogService.getAll()
      const sortedBlogByLikes = blog.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogByLikes)
    }
    sortBlogs()
  }, [])

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayNotification = (message, color, time) => {
    setNotificationMessage(message)
    setNotificationColor(color)
    if (time > 0) {
      setTimeout(() => {
        setNotificationMessage('')
      }, time)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setNotificationMessage('')
    try {
      const user = await loginService.login({
        username, password
      })
      console.log('user', user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      displayNotification('wrong username of password', 'red', 0)
      console.log('handleLogin', exception)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
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
    setBlogs(blogs.concat(newBlog))
    displayNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'green', 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} color={notificationColor} />
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
      <Notification message={notificationMessage} color={notificationColor} />
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm createBlogAction={createBlogAction} />
      </Togglable>

      {blogs.map(blog => {
        console.log(blog, user)
        const isIdMatch = blog.user.username === user.username ? true : false
        return <Blog key={blog.id} blog={blog} showRemoveButton={isIdMatch} handleRemoveBlog={handleRemoveBlog} />
      })}
    </div>
  )
}

export default App