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
    remove(state, action) {
      return state.filter(x => x.id !== action.payload.id)
    },
    clear(state) {
      return initialState
    },
    update(state, action) {
      return state.map(x => x.id === action.payload.id
        ? action.payload
        : x)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(set(blogs))
  }
}
export const deleteBlog = (blog) => {
  return async dispatch => {
    const res = await blogService.remove(blog.id)
    dispatch(remove(blog))
  }
}
export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch(update(updatedBlog))
  }
}
export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(update(updatedBlog))
  }
}

export const { create, set, clear, remove, update } = blogsSlice.actions
export default blogsSlice.reducer