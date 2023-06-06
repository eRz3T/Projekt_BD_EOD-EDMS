import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import CasePreviewBar from '@/features/caseContent/casePreviewBar/CasePreviewBar'
import MainSection from '@/features/caseContent/mainSection/MainSection'
import { selectCases } from '@/core/store/cases/casesSelectors'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { selectCaseComments, selectCommentsStatus } from '@/core/store/comments/commentsSelectors'
import { getCaseComments, resetComments } from '@/core/store/comments/commentsSlice'
import { selectAuthToken, selectUser } from '@/core/store/auth/authSelectors'
import { ClientRoutes } from '@/core/router/Routes.enum'
import { completeStep, revertStep } from '@/core/api/httpApi'
import { enqueueSnackbar } from 'notistack'
import { getAllUserCases } from '@/core/store/cases/casesSlice'

const Case = () => {
  const [isArchiveView, setIsArchiveView] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectAuthToken)
  const comments = useAppSelector(selectCaseComments)
  const commentsStatus = useAppSelector(selectCommentsStatus)
  const userId = useAppSelector(selectUser)?.id
  const [isNewPost, setIsNewPost] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()
  const caseDetails = useAppSelector(selectCases).find((item) => item.id === id) ?? null
  const navigate = useNavigate()

  const handleStepComplete = () => {
    completeStep(
      String(token),
      String(caseDetails?.id),
      String(caseDetails?.active_workflow_step_id)
    )
      .then(() => {
        enqueueSnackbar('Przekazano sprawę dalej', { variant: 'success' })
        !!userId && dispatch(getAllUserCases({ userId, token }))
        navigate(ClientRoutes.DASHBOARD)
      })
      .catch(() => {
        enqueueSnackbar('Błąd w trakcie przekazywania sprawy', { variant: 'error' })
      })
  }

  const handleStepRevert = () => {
    if (caseDetails?.previous_step_id === null) {
      enqueueSnackbar('To jest pierwszy krok', { variant: 'error' })
    } else {
      revertStep(String(token), String(caseDetails?.id), String(caseDetails?.previous_step_id))
        .then(() => {
          enqueueSnackbar('Zwrócono sprawę do poprzedniego kroku', { variant: 'success' })
          !!userId && dispatch(getAllUserCases({ userId, token }))
          navigate(ClientRoutes.DASHBOARD)
        })
        .catch(() => {
          enqueueSnackbar('Błąd w trakcie przekazywania sprawy', { variant: 'error' })
        })
    }
  }

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

  const sortedComments = [...comments].sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
    return dateA - dateB
  })

  const location = useLocation()
  useEffect(() => {
    location?.state && location.state === 'noEdit'
      ? setIsArchiveView(true)
      : setIsArchiveView(false)
  }, [location])

  return (
    <main className='bg-light min-h-[calc(100vh-76px)] py-6'>
      <div className='container mx-auto flex flex-row'>
        <section className='flex-[0.7]'>
          <MainSection
            setIsNewPost={setIsNewPost}
            isNewPost={isNewPost}
            caseDetails={caseDetails}
            comments={sortedComments}
          />
        </section>
        <section className='flex-[0.3]'>
          <CasePreviewBar
            setIsNewPost={setIsNewPost}
            isNewPost={isNewPost}
            caseDetails={caseDetails}
            handleStepComplete={handleStepComplete}
            handleStepRevert={handleStepRevert}
            isArchiveView={isArchiveView}
          />
        </section>
      </div>
    </main>
  )
}

export default Case
