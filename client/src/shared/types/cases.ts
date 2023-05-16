export interface GetAllUserCasesRequest {
  userId: string
}

export interface ICases {
  id: string
  assigned_user_id: string
  created_by: string
  title: string
  description: string
  expires_at: Date
  created_at: Date
  updated_at: Date
  created_by_details: string
  assigned_to_details: string
}

export interface ICaseFile {
  id: string
  case_id: string
  user_id: string
  filename: string
  created_at: Date
  updated_at: Date
}
