import { configureStore } from '@reduxjs/toolkit'
import notoficationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import signInUserReducer from './reducers/signInUserReducer'

const store = configureStore({
  reducer: {
    notification: notoficationReducer,
    blogs: blogsReducer,
    signInUser: signInUserReducer
  }
})

export default store