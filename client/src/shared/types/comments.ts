export interface GetCaseCommentsRequest {
  caseId: string
}

export interface IComments {
  id: string
  case_id: string
  user_id: string
  content: string
  created_at: Date
  updated_at: Date
  file_id: string
  filename: string
  created_by_details: string
}
