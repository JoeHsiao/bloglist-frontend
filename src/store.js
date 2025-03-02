import { configureStore } from '@reduxjs/toolkit'
import notoficationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import signInUserReducer from './reducers/signInUserReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    notification: notoficationReducer,
    blogs: blogsReducer,
    signInUser: signInUserReducer,
    users: usersReducer
  }
})

export default store