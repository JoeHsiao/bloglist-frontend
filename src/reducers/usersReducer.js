import usersService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

export const getAllUsers = () => {
  return async dispatch => {
    const userList = await usersService.getAll()
    dispatch(set(userList))
  }
}

export const { set } = usersSlice.actions
export default usersSlice.reducer