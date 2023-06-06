import {
  createNewCase,
  fetchAllAdminCases,
  fetchAllArchivedCases,
  fetchAllUserCases,
  fetchFilesForCase,
} from '@/core/api/httpApi'
import { IDocument } from '@/features/dashboard/documentsList/dummyData'
import { IAdminCase, ICaseFile, ICases } from '@/shared/types/cases'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface InitialState {
  cases: ICases[]
  adminCases: IAdminCase[]
  archivedCases: IAdminCase[]
  observedCases: ICases[]
  filesForCase: ICaseFile[]
  status: 'idle' | 'complete' | 'loading' | 'failed'
  caseActionType: 'create' | 'edit'
  caseToEdit: IAdminCase | null
}

const initialState: InitialState = {
  cases: [],
  adminCases: [],
  archivedCases: [],
  observedCases: [],
  filesForCase: [],
  status: 'idle',
  caseActionType: 'create',
  caseToEdit: null,
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
    setCaseActionType: (state, action) => {
      state.caseActionType = action.payload
    },
    setCaseToEdit: (state, action) => {
      state.caseToEdit = action.payload
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
      .addCase(getAllAdminCases.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllAdminCases.fulfilled, (state, action) => {
        state.status = 'complete'
        state.adminCases = action.payload
      })
      .addCase(getAllAdminCases.rejected, (state) => {
        state.status = 'failed'
        state.adminCases = []
      })
      .addCase(getAllArchivedCases.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllArchivedCases.fulfilled, (state, action) => {
        state.status = 'complete'
        state.archivedCases = action.payload
      })
      .addCase(getAllArchivedCases.rejected, (state) => {
        state.status = 'failed'
        state.archivedCases = []
      })
  },
})

export const getAllUserCases = createAsyncThunk(
  'getAllUserCases',
  async ({ userId, token }: { userId: string; token: string | null }, { rejectWithValue }) => {
    try {
      const response = await fetchAllUserCases(userId, token)
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

export const getAllAdminCases = createAsyncThunk(
  'getAllAdminCases',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetchAllAdminCases(token)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Fetch all cases failed, unknown error')
      }
    }
  }
)

export const getAllArchivedCases = createAsyncThunk(
  'getAllArchivedCases',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetchAllArchivedCases(token)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Fetch all archived cases failed, unknown error')
      }
    }
  }
)

export const createCase = createAsyncThunk(
  'createCase',
  async (
    {
      assignedUserId,
      createdBy,
      title,
      description,
      workflowId,
    }: {
      assignedUserId: string
      createdBy: string
      title: string
      description: string
      workflowId: string
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await createNewCase(
        assignedUserId,
        createdBy,
        title,
        description,
        workflowId
      )
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Creating case failed, unknown error')
      }
    }
  }
)

export const { setObservedCases, resetObservedCases, setCaseActionType, setCaseToEdit } =
  casesSlice.actions

export default casesSlice.reducer
