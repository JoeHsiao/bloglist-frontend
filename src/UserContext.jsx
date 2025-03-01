import { useReducer, createContext } from 'react'

const userContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      return action.payload
    }
    default:
      return state
  }
}
export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <userContext.Provider value={[user, userDispatch]}>
      {props.children}
    </userContext.Provider>
  )
}

export default userContext