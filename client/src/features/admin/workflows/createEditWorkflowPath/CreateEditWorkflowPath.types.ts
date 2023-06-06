import { IUser } from '@/shared/types/users'
import { ICategory, IWorkflow, IWorkflowStep } from '@/shared/types/workflows'

export interface ICreateEditWorkflowSettings {
  action: string
  category: string
}

export interface ICreateEditWorkflowProps {
  categories: ICategory[]
  workflowSteps: IWorkflowStep[]
  selectedWorkflow: IWorkflow | null
}
