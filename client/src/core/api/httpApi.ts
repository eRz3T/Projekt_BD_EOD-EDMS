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

export const fetchAllUserCases = async (userId: string): Promise<ICases[]> => {
  try {
    const response = await base.get(`/cases/user/${userId}`)
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
