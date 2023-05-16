import { downloadFileById } from '@/core/api/httpApi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface InitialState {
  status: 'idle' | 'complete' | 'loading' | 'failed'
}

const initialState: InitialState = {
  status: 'idle',
}

export const filesSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadFile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(downloadFile.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(downloadFile.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const downloadFile = createAsyncThunk(
  'downloadFile',
  async (fileId: string, { rejectWithValue }) => {
    try {
      const response = await downloadFileById(fileId)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Fetch case comments failed, unknown error')
      }
    }
  }
)

export const {} = filesSlice.actions

export default filesSlice.reducer
