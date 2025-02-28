import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: '',
  color: '#00FF00'
}

const notificationSlice = createSlice({
  name: 'notofication',
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
    clear: (state) => {
      state.content = ''
    }
  }
})

export const setNotificationTemporarily = (content, color, secs) => {
  return dispatch => {
    dispatch(set({ content, color }))
    if (secs > 0) {
      setTimeout(() => dispatch(clear()), secs * 1000)
    }
  }
}

export const { set, clear } = notificationSlice.actions
export default notificationSlice.reducer