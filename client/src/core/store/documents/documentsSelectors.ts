import type { RootState } from '../store'

export const selectObservedDocuments = (state: RootState) => state.documents.observedDocuments
