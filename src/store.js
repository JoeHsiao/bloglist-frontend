import { configureStore } from '@reduxjs/toolkit'
import notoficationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notification: notoficationReducer,
  }
})

export default store