import { loginUser } from '@/core/api/httpApi'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  status: 'complete' | 'loading' | 'failed'
  error: any | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  status: 'complete',
  error: null,
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'complete'
        state.token = action.payload
        localStorage.setItem('token', action.payload)
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed'
        state.token = null
        localStorage.removeItem('token')
      })
  },
})

// LOGIN ASYNC THUNK
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials.email, credentials.password)
      return response.token
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Login failed, unknown error')
      }
    }
  }
)

export const { logout } = authSlice.actions

export default authSlice.reducer
