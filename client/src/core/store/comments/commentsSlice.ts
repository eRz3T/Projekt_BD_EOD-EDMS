import { fetchCaseComments, postNewComment } from '@/core/api/httpApi'
import { IComments } from '@/shared/types/comments'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface InitialState {
  comments: IComments[]
  status: 'idle' | 'complete' | 'loading' | 'failed'
}

const initialState: InitialState = {
  comments: [],
  status: 'idle',
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetComments: (state) => {
      state.status = 'idle'
      state.comments = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCaseComments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCaseComments.fulfilled, (state, action) => {
        state.status = 'complete'
        state.comments = action.payload
      })
      .addCase(getCaseComments.rejected, (state) => {
        state.status = 'failed'
        state.comments = []
      })
      .addCase(createNewComment.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createNewComment.fulfilled, (state) => {
        state.status = 'complete'
      })
      .addCase(createNewComment.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const createNewComment = createAsyncThunk(
  'createNewComment',
  async (
    comment: { caseId: string; userId: string; content: string; file?: File },
    { rejectWithValue }
  ) => {
    try {
      const response = await postNewComment(
        comment.caseId,
        comment.userId,
        comment.content,
        comment.file
      )
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Posting new comment failed, unknown error')
      }
    }
  }
)

export const getCaseComments = createAsyncThunk(
  'getCaseComments',
  async (caseId: string, { rejectWithValue }) => {
    try {
      const response = await fetchCaseComments(caseId)
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

export const { resetComments } = commentsSlice.actions

export default commentsSlice.reducer
