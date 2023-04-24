import { IDocument } from '@/features/dashboard/documentsList/dummyData'
import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  observedDocuments: IDocument[]
}

const initialState: InitialState = {
  observedDocuments: [],
}

export const documentsSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setObservedDocuments: (state, action) => {
      state.observedDocuments.push(action.payload)
    },
    resetObservedDocuments: (state) => {
      state.observedDocuments = []
    },
  },
})

export const { setObservedDocuments, resetObservedDocuments } = documentsSlice.actions

export default documentsSlice.reducer
