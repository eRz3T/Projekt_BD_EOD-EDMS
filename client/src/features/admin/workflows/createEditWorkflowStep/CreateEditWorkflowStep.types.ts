import { IUser } from '@/shared/types/users'
import { IWorkflow, IWorkflowStep } from '@/shared/types/workflows'

export interface ICreateEditStepForm {
  stepName: string
  assignTo: string
  nextStep: string
  prevStep: string
}

export interface ICreateEditStepProps {
  users: IUser[]
  selectedWorkflow: IWorkflow | null
  workflowSteps: IWorkflowStep[]
  createStep: ({
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
  }) => Promise<void>
  updateWorkflowStep: ({
    stepId,
    userId,
    previousStep,
    action,
  }: {
    stepId: string
    userId: string
    previousStep: string
    action: string
  }) => Promise<void>
}
