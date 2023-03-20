import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setToken: (state, payload) => {
      state.token = payload.token
    },
  },
})

export const { setToken } = authSlice.actions

export default authSlice.reducer
