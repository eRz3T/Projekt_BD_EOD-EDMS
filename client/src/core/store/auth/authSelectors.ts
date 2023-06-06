import type { RootState } from '../store'

export const selectAuthToken = (state: RootState) => state.auth.token
export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectUser = (state: RootState) => state.auth.user
