import { ICases } from '@/shared/types/cases'
import { IComments } from '@/shared/types/comments'
import { IUser } from '@/shared/types/users'
import axios from 'axios'

const base = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// =========== AUTH ===========

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await base.post('/auth/login', { email, password })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const registerUser = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  role: string
) => {
  try {
    const response = await base.post('/auth/register', {
      first_name,
      last_name,
      email,
      password,
      role,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

// =========== CASES ===========

export const fetchAllUserCases = async (
  userId: string,
  token: string | null
): Promise<ICases[]> => {
  try {
    const response = await base.get(`/users/${userId}/active-cases`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const fetchAllAdminCases = async (token: string | null) => {
  try {
    const response = await base.get(`/cases`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const fetchAllArchivedCases = async (token: string | null) => {
  try {
    const response = await base.get(`/cases/archived`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const createNewCase = async (
  assignedUserId: string,
  createdBy: string,
  title: string,
  description: string,
  workflowId: string
) => {
  try {
    const response = await base.post('/cases/with-workflow', {
      assignedUserId,
      createdBy,
      title,
      description,
      expiresAt: null,
      workflowId,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

// ========== COMMENTS ==========

export const postNewComment = async (
  caseId: string,
  userId: string,
  content: string,
  file?: File
) => {
  try {
    const formData = new FormData()
    formData.append('caseId', caseId)
    formData.append('userId', userId)
    formData.append('content', content)

    if (file) {
      formData.append('file', file)
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const response = await base.post(`/comments`, formData, config)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const fetchCaseComments = async (caseId: string): Promise<IComments[]> => {
  try {
    const response = await base.get(`/comments/case/${caseId}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

// ========== FILES ==========

export const downloadFileById = async (fileId: string) => {
  try {
    const response = await base.get(`/files/${fileId}/download`, {
      responseType: 'blob',
    })
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const fetchFilesForCase = async (caseId: string) => {
  try {
    const response = await base.get(`/files/case/${caseId}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

// ========== USERS ==========

export const fetchAllUsers = async (token: string) => {
  try {
    const response = await base.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const updateUser = async (token: string, userId: string, newUserDetails: any) => {
  try {
    const response = await base.put(`/users/${userId}`, newUserDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const deleteUser = async (token: string, userId: string) => {
  try {
    const response = await base.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

// ========== WORKFLOW CATEGORIES ==========
export const fetchAllCategories = async (token: string) => {
  try {
    const response = await base.get(`/workflow-categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const createWorkflowNewCategory = async (name: string, color: string, icon: string) => {
  try {
    const response = await base.post('/workflow-categories', {
      name,
      color,
      icon,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const updateCategory = async (
  name: string,
  color: string,
  icon: string,
  categoryId: string
) => {
  try {
    const response = await base.patch(`/workflow-categories/${categoryId}`, {
      name,
      color,
      icon,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

// ========== WORKFLOW STEPS ==========
export const completeStep = async (token: string, caseId: string, workflowStepId: string) => {
  try {
    const response = await base.patch(
      `/workflow-step/${caseId}/complete`,
      { workflowStepId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const revertStep = async (token: string, caseId: string, workflowStepId: string) => {
  try {
    const response = await base.patch(
      `/workflow-step/${caseId}/revert`,
      { workflowStepId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const createNewWorkflowStep = async (
  workflowId: string,
  userId: string,
  stepNumber: number,
  previousStep: string,
  action: string
) => {
  try {
    const response = await base.post('/workflow-step', {
      workflow_id: workflowId,
      user_id: userId,
      step_number: stepNumber,
      previous_step: previousStep,
      action,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const updateWorkflowStep = async (
  stepId: string,
  userId: string,
  previousStep: string,
  action: string
) => {
  try {
    const response = await base.patch(`/workflow-step/${stepId}`, {
      user_id: userId,
      previous_step: previousStep,
      action,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

// ========== WORKFLOWS ==========
export const createNewWorkflow = async (name: string, category: string) => {
  try {
    const response = await base.post('/workflows', {
      name,
      category,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const fetchAllWorkflows = async (
  token: string,
  workflowName?: string,
  categoryId?: string
) => {
  try {
    const response = await base.get(`/workflows`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        workflowName,
        categoryId,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}

export const fetchWorkflowSteps = async (token: string, workflowId: string) => {
  try {
    const response = await base.get(`/workflows/${workflowId}/steps`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(String(error.response?.status))
    } else {
      throw new Error('An unknown error occurred.')
    }
  }
}
