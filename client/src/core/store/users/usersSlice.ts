import { fetchAllUsers } from '@/core/api/httpApi'
import { IUser } from '@/shared/types/users'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface InitialState {
  users: IUser[]
  status: 'idle' | 'complete' | 'loading' | 'failed'
  usersAction: 'create' | 'edit'
  userToEdit: IUser | null
}

const initialState: InitialState = {
  users: [],
  status: 'idle',
  usersAction: 'create',
  userToEdit: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersAction: (state, action) => {
      state.usersAction = action.payload
    },
    setUserToEdit: (state, action) => {
      state.userToEdit = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'complete'
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.status = 'failed'
        state.users = []
      })
  },
})

// export const createNewComment = createAsyncThunk(
//   'createNewComment',
//   async (
//     comment: { caseId: string; userId: string; content: string; file?: File },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await postNewComment(
//         comment.caseId,
//         comment.userId,
//         comment.content,
//         comment.file
//       )
//       return response
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message)
//       } else {
//         return rejectWithValue('Posting new comment failed, unknown error')
//       }
//     }
//   }
// )

export const getAllUsers = createAsyncThunk(
  'getAllUsers',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsers(token)
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

export const { setUserToEdit, setUsersAction } = usersSlice.actions

export default usersSlice.reducer
