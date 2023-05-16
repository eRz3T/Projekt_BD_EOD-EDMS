import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import casesSlice from './cases/casesSlice'
import commentsSlice from './comments/commentsSlice'
import filesSlice from './files/filesSlice'
import usersSlice from './users/usersSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cases: casesSlice,
    comments: commentsSlice,
    files: filesSlice,
    users: usersSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
