import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      setUser(user)
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
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    const token = user.token
    const blog = await blogService.create({
      title, author, url, token
    })
    const updatedList = await blogService.getAll()
    setBlogs(updatedList)
    displayNotification(`a new blog ${title} by ${author} added`, 'green', 5000)
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
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>title<input id='0' onChange={({ target }) => setTitle(target.value)}></input></div>
        <div>author<input id='1' onChange={({ target }) => setAuthor(target.value)}></input></div>
        <div>url<input id='2' onChange={({ target }) => setUrl(target.value)}></input></div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App