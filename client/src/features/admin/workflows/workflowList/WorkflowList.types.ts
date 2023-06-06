import { ICategory, IWorkflow } from '@/shared/types/workflows'

export interface IWorkflowFilters {
  search: string
  category: string
}

export interface IWorkflowListProps {
  categories: ICategory[]
  workflows: IWorkflow[]
  getFilteredWorkflows: (workflowName?: string, workflowId?: string) => void
  createWorkflow: (workflowName: string, categoryId: string) => Promise<void>
}
