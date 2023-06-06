import type { RootState } from '../store'

export const selectAllWorkflowCategories = (state: RootState) => state.workflowCategories.categories
export const selectWorkflowCategoriesStatus = (state: RootState) => state.workflowCategories.status
export const selectWorkflowCategoryAction = (state: RootState) =>
  state.workflowCategories.workflowCategoryAction
export const selectCategoryToEdit = (state: RootState) => state.workflowCategories.categoryToEdit
