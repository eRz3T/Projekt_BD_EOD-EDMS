import axios from 'axios'

const base = axios.create({
  baseURL: 'http://localhost:5000/api',
})

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
