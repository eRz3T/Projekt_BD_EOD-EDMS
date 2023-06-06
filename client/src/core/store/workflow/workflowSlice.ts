import {
  createNewWorkflow,
  createNewWorkflowStep,
  fetchAllWorkflows,
  fetchWorkflowSteps,
  updateWorkflowStep,
} from '@/core/api/httpApi'
import { IWorkflow, IWorkflowStep } from '@/shared/types/workflows'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface InitialState {
  workflows: IWorkflow[]
  workflowSteps: IWorkflowStep[]
  status: 'idle' | 'complete' | 'loading' | 'failed'
  workflowToEdit: IWorkflow | null
  stepToEdit: IWorkflowStep | null
}

const initialState: InitialState = {
  workflows: [],
  workflowSteps: [],
  status: 'idle',
  workflowToEdit: null,
  stepToEdit: null,
}

export const workflowSlice = createSlice({
  name: 'workflowSlice',
  initialState,
  reducers: {
    setWorkflowToEdit: (state, action) => {
      state.workflowToEdit = action.payload
    },
    setStepToEdit: (state, action) => {
      state.stepToEdit = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorkflows.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllWorkflows.fulfilled, (state, action) => {
        state.status = 'complete'
        state.workflows = action.payload
      })
      .addCase(getAllWorkflows.rejected, (state) => {
        state.status = 'failed'
        state.workflows = []
      })
      .addCase(getWorkflowSteps.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getWorkflowSteps.fulfilled, (state, action) => {
        state.status = 'complete'
        state.workflowSteps = action.payload
      })
      .addCase(getWorkflowSteps.rejected, (state) => {
        state.status = 'failed'
        state.workflowSteps = []
      })
  },
})

export const getAllWorkflows = createAsyncThunk(
  'getAllWorkflows',
  async (
    {
      token,
      workflowName,
      workflowId,
    }: { token: string; workflowName?: string; workflowId?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchAllWorkflows(token, workflowName, workflowId)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Fetch workflows failed, unknown error')
      }
    }
  }
)

export const createWorkflow = createAsyncThunk(
  'createWorkflow',
  async ({ name, category }: { name: string; category: string }, { rejectWithValue }) => {
    try {
      const response = await createNewWorkflow(name, category)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Creating workflow failed, unknown error')
      }
    }
  }
)

export const getWorkflowSteps = createAsyncThunk(
  'getWorkflowSteps',
  async ({ token, workflowId }: { token: string; workflowId: string }, { rejectWithValue }) => {
    try {
      const response = await fetchWorkflowSteps(token, workflowId)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Fetch workflow steps failed, unknown error')
      }
    }
  }
)

export const createWorkflowStep = createAsyncThunk(
  'createWorkflowStep',
  async (
    {
      workflowId,
      userId,
      stepNumber,
      previousStep,
      action,
    }: {
      workflowId: string
      userId: string
      stepNumber: number
      previousStep: string
      action: string
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await createNewWorkflowStep(
        workflowId,
        userId,
        stepNumber,
        previousStep,
        action
      )
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Creating workflow step failed, unknown error')
      }
    }
  }
)

export const updateStep = createAsyncThunk(
  'updateWorkflowStep',
  async (
    {
      stepId,
      userId,
      previousStep,
      action,
    }: {
      stepId: string
      userId: string
      previousStep: string
      action: string
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateWorkflowStep(stepId, userId, previousStep, action)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Updating workflow step failed, unknown error')
      }
    }
  }
)

export const { setWorkflowToEdit, setStepToEdit } = workflowSlice.actions

export default workflowSlice.reducer
