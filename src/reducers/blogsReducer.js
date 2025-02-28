import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    create(state, action) {
      state.push(action.payload)
    },
    clear(state) {
      return initialState
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(set(blogs))
  }
}

export const { create, set, clear } = blogsSlice.actions
export default blogsSlice.reducer