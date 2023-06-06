import axios from 'axios'
import { downloadFileById } from '@/core/api/httpApi'

export const handleFileDownload = async (filename: string, fileId: string) => {
  if (filename && fileId) {
    try {
      const response = (await downloadFileById(fileId)).data

      const url = window.URL.createObjectURL(new Blob([response]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename.split('-').slice(5).join('-'))
      document.body.appendChild(link)
      link.click()
      link?.parentNode?.removeChild(link)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(String(error.response?.status))
      } else {
        throw new Error('An unknown error occurred.')
      }
    }
  }
}
