import type { RootState } from '../store'

export const selectCommentsStatus = (state: RootState) => state.comments.status
export const selectCaseComments = (state: RootState) => state.comments.comments
