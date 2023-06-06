import { ICases } from '@/shared/types/cases'

export interface ICasePreviewBarProps {
  setIsNewPost: React.Dispatch<React.SetStateAction<boolean>>
  isNewPost: boolean
  caseDetails: ICases | null
  handleStepComplete: () => void
  handleStepRevert: () => void
  isArchiveView: boolean
}
