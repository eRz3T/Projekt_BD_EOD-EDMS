import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import documentsSlice from './documents/documentsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    documents: documentsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
