import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IAuthState {
  token: string
}

const initialState = {
  token: '',
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
})

export const { setToken } = authSlice.actions

export default authSlice.reducer
