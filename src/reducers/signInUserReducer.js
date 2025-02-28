import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const signInUserSlice = createSlice({
  name: 'signInUser',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

export const { set } = signInUserSlice.actions
export default signInUserSlice.reducer