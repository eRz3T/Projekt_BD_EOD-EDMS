import type { RootState } from '../store'

export const selectObservedCases = (state: RootState) => state.cases.observedCases
export const selectCases = (state: RootState) => state.cases.cases
export const selectCasesStatus = (state: RootState) => state.cases.status
export const selectCaseFiles = (state: RootState) => state.cases.filesForCase
