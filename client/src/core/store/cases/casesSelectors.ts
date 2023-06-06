import type { RootState } from '../store'

export const selectObservedCases = (state: RootState) => state.cases.observedCases
export const selectCases = (state: RootState) => state.cases.cases
export const selectAdminCases = (state: RootState) => state.cases.adminCases
export const selectArchivedCases = (state: RootState) => state.cases.archivedCases
export const selectCasesStatus = (state: RootState) => state.cases.status
export const selectCaseFiles = (state: RootState) => state.cases.filesForCase
export const selectCaseActionType = (state: RootState) => state.cases.caseActionType
export const selectCaseToEdit = (state: RootState) => state.cases.caseToEdit
