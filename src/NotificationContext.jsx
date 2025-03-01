import { createContext, useReducer } from 'react'

export const NotificationContext = createContext()

const initialState = {
  content: '',
  color: '#00FF00'
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      return action.payload
    }
    case 'CLEAR': {
      return { ...action.payload, content: '' }
    }
    default:
      return state
  }
}

const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider