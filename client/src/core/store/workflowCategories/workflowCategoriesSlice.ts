import { createWorkflowNewCategory, fetchAllCategories } from '@/core/api/httpApi'
import { ICategory } from '@/shared/types/workflows'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface InitialState {
  categories: ICategory[]
  status: 'idle' | 'complete' | 'loading' | 'failed'
  workflowCategoryAction: 'create' | 'edit'
  categoryToEdit: ICategory | null
}

const initialState: InitialState = {
  categories: [],
  status: 'idle',
  workflowCategoryAction: 'create',
  categoryToEdit: null,
}

export const workflowCategories = createSlice({
  name: 'workflowCategories',
  initialState,
  reducers: {
    setWorkflowCategoryAction: (state, action) => {
      state.workflowCategoryAction = action.payload
    },
    setWorkflowCategoryToEdit: (state, action) => {
      state.categoryToEdit = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorkflowCategories.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllWorkflowCategories.fulfilled, (state, action) => {
        state.status = 'complete'
        state.categories = action.payload
      })
      .addCase(getAllWorkflowCategories.rejected, (state) => {
        state.status = 'failed'
        state.categories = []
      })
  },
})

export const getAllWorkflowCategories = createAsyncThunk(
  'getAllWorkflowCategories',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetchAllCategories(token)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Fetch workflow categories failed, unknown error')
      }
    }
  }
)

export const createWorkflowCategory = createAsyncThunk(
  'createWorkflowCategory',
  async (
    { name, color, icon }: { name: string; color: string; icon: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await createWorkflowNewCategory(name, color, icon)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Creating category failed, unknown error')
      }
    }
  }
)

export const { setWorkflowCategoryAction, setWorkflowCategoryToEdit } = workflowCategories.actions

export default workflowCategories.reducer
