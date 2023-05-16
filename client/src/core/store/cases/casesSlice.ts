import { fetchAllUserCases, fetchFilesForCase } from '@/core/api/httpApi'
import { IDocument } from '@/features/dashboard/documentsList/dummyData'
import { ICaseFile, ICases } from '@/shared/types/cases'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface InitialState {
  cases: ICases[]
  observedCases: ICases[]
  filesForCase: ICaseFile[]
  status: 'idle' | 'complete' | 'loading' | 'failed'
}

const initialState: InitialState = {
  cases: [],
  observedCases: [],
  filesForCase: [],
  status: 'idle',
}

export const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    setObservedCases: (state, action) => {
      state.observedCases.push(action.payload)
    },
    resetObservedCases: (state) => {
      state.observedCases = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserCases.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllUserCases.fulfilled, (state, action) => {
        state.status = 'complete'
        state.cases = action.payload
      })
      .addCase(getAllUserCases.rejected, (state) => {
        state.status = 'failed'
        state.cases = []
      })
      .addCase(getFilesForCase.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getFilesForCase.fulfilled, (state, action) => {
        state.status = 'complete'
        state.filesForCase = action.payload
      })
      .addCase(getFilesForCase.rejected, (state) => {
        state.status = 'failed'
        state.filesForCase = []
      })
  },
})

export const getAllUserCases = createAsyncThunk(
  'getAllUserCases',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetchAllUserCases(userId)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Fetch all user cases failed, unknown error')
      }
    }
  }
)

export const getFilesForCase = createAsyncThunk(
  'getFilesForCase',
  async (caseId: string, { rejectWithValue }) => {
    try {
      const response = await fetchFilesForCase(caseId)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Fetch files for case failed, unknown error')
      }
    }
  }
)

export const { setObservedCases, resetObservedCases } = casesSlice.actions

export default casesSlice.reducer
