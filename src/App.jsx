import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationTemporarily, clear } from './reducers/notificationReducer'
import { clear as clearBlogs } from './reducers/blogsReducer'
import { set } from './reducers/signInUserReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import BlogList from './components/BlogList'
import User from './components/User'
import BlogDetails from './components/BlogDetails'

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
  const user = useSelector(state => state.signInUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      dispatch(set(user))
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
      dispatch(set(user))
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
    dispatch(set(null))
    blogService.setToken(null)
    dispatch(clearBlogs())
  }

  const padding = {
    padding: '5px',
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
      <Notification />
      <Router>
        <Link to='/' style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
        <Routes>
          <Route path='/' element={<BlogList />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/blogs/:id' element={<BlogDetails />} />
        </Routes>
      </Router>
    </div >
  )
}

export default App