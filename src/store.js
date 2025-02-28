import { configureStore } from '@reduxjs/toolkit'
import notoficationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'

const store = configureStore({
  reducer: {
    notification: notoficationReducer,
    blogs: blogsReducer,
  }
})

export default store