import { IWorkflow } from '@/shared/types/workflows'

export interface CreateEditCaseForm {
  caseTitle: string
  caseDescription: string
  caseWorkflow: string
}

export interface CreateEditCaseProps {
  workflows: IWorkflow[]
}
