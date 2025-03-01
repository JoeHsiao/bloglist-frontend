import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'
import { NotificationContext } from './NotificationContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const Notification = () => {
  const [notification] = useContext(NotificationContext)
  const message = notification.content
  const color = notification.color
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [, notificationDispatch] = useContext(NotificationContext)

  const blogFormRef = useRef()

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => await blogService.getAll()
  })

  console.log('result', result)

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayNotification = (message, color, time) => {
    notificationDispatch({ type: 'SET', payload: { content: message, color: color } })
    if (time > 0) {
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR', payload: {} })
      }, time)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    notificationDispatch({ type: 'CLEAR' })
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
      displayNotification('wrong username or password', 'red', 0)
      console.log('handleLogin', exception)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  // const handleRemoveBlog = async (blog) => {
  //   if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
  //     try {
  //       await blogService.remove(blog.id)
  //       setBlogs(blogs.filter(b => b.id !== blog.id))
  //     } catch (error) {
  //       console.error('Error remove blog', error.message)
  //     }
  //   }
  // }

  // const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
  const blogs = result.data

  if (result.isLoading) {
    return (
      <h3>Data loading...</h3>
    )
  }

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
        <BlogForm />
      </Togglable>

      {blogs.map(blog => {
        const isIdMatch = blog.user.username === user.username ? true : false
        return <Blog key={blog.id} blog={blog} showRemoveButton={isIdMatch} />
      })}
    </div>
  )
}

export default App