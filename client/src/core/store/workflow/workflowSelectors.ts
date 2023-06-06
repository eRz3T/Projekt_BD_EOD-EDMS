import type { RootState } from '../store'

export const selectAllWorkflows = (state: RootState) => state.workflow.workflows
export const selectWorkflowStatus = (state: RootState) => state.workflow.status
export const selectWorkflowToEdit = (state: RootState) => state.workflow.workflowToEdit
export const selectWorkflowSteps = (state: RootState) => state.workflow.workflowSteps
export const selectStepToEdit = (state: RootState) => state.workflow.stepToEdit
