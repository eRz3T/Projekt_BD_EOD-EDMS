import type { RootState } from '../store'

export const selectAllUsers = (state: RootState) => state.users.users
export const selectUsersStatus = (state: RootState) => state.users.status
export const selectUsersAction = (state: RootState) => state.users.usersAction
export const selectUserToEdit = (state: RootState) => state.users.userToEdit
