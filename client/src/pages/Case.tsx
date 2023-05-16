import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CasePreviewBar from '@/features/caseContent/casePreviewBar/CasePreviewBar'
import MainSection from '@/features/caseContent/mainSection/MainSection'
import { selectCases } from '@/core/store/cases/casesSelectors'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { selectCaseComments, selectCommentsStatus } from '@/core/store/comments/commentsSelectors'
import { getCaseComments, resetComments } from '@/core/store/comments/commentsSlice'

const Case = () => {
  const dispatch = useAppDispatch()
  const comments = useAppSelector(selectCaseComments)
  const commentsStatus = useAppSelector(selectCommentsStatus)
  const [isNewPost, setIsNewPost] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()
  const caseDetails = useAppSelector(selectCases).find((item) => item.id === id) ?? null

  useEffect(() => {
    if (commentsStatus === 'idle' && id) {
      dispatch(getCaseComments(id))
    }
  }, [dispatch, commentsStatus, id])

  useEffect(() => {
    return () => {
      dispatch(resetComments())
    }
  }, [dispatch])

  return (
    <main className='bg-light min-h-[calc(100vh-76px)] py-6'>
      <div className='container mx-auto flex flex-row'>
        <section className='flex-[0.7]'>
          <MainSection
            setIsNewPost={setIsNewPost}
            isNewPost={isNewPost}
            caseDetails={caseDetails}
            comments={comments}
          />
        </section>
        <section className='flex-[0.3]'>
          <CasePreviewBar
            setIsNewPost={setIsNewPost}
            isNewPost={isNewPost}
            caseDetails={caseDetails}
          />
        </section>
      </div>
    </main>
  )
}

export default Case
