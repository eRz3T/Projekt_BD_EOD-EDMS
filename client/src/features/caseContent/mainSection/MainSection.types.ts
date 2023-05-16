import { ICases } from '@/shared/types/cases'
import { IComments } from '@/shared/types/comments'

export interface IMainSectionProps {
  setIsNewPost: React.Dispatch<React.SetStateAction<boolean>>
  isNewPost: boolean
  caseDetails: ICases | null
  comments: IComments[]
}
