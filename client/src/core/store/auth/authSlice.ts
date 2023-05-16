import { loginUser, registerUser } from '@/core/api/httpApi'
import { IUser } from '@/shared/types/auth'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  user: IUser | null
  status: 'complete' | 'loading' | 'failed'
  error: any | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(String(localStorage.getItem('user'))) : null,
  status: 'complete',
  error: null,
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      state.user = null
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
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed'
        state.token = null
        state.user = null
        localStorage.removeItem('user')
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
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Login failed, unknown error')
      }
    }
  }
)

// REGISTER ASYNC THUNK
export const createUser = createAsyncThunk(
  'auth/createUser',
  async (
    credentials: {
      first_name: string
      last_name: string
      email: string
      password: string
      role: string
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await registerUser(
        credentials.first_name,
        credentials.last_name,
        credentials.email,
        credentials.password,
        credentials.role
      )
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Register failed, unknown error')
      }
    }
  }
)

export const { logout } = authSlice.actions

export default authSlice.reducer
