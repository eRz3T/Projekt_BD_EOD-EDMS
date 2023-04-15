import type { RootState } from '../store'

export const selectAuthToken = (state: RootState) => state.auth.token
