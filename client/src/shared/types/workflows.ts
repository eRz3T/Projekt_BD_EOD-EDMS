export interface ICategory {
  id: string
  name: string
  color: string
  icon: string
}

export interface IWorkflow {
  id: string
  name: string
  category_id: string
  created_at: Date
  updated_at: Date
  category_name: string
  category_color: string
  category_icon: string
}

export interface IWorkflowStep {
  id: string
  action: string
  created_at: Date
  updated_at: Date
  previous_step: string | null
  step_number: number
  user_id: string
  assigned_user: string
  workflow_id: string
}
