import { selectAuthToken, selectUser } from '@/core/store/auth/authSelectors'
import { selectCases, selectCasesStatus } from '@/core/store/cases/casesSelectors'
import { getAllUserCases } from '@/core/store/cases/casesSlice'
import DocumentsList from '@/features/dashboard/documentsList/DocumentsList'
import ObservedDocuments from '@/features/dashboard/observedDocuments/ObservedDocuments'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const cases = useAppSelector(selectCases)
  const casesStatus = useAppSelector(selectCasesStatus)
  const token = useAppSelector(selectAuthToken)
  const userId = useAppSelector(selectUser)?.id

  useEffect(() => {
    if (casesStatus === 'idle' && userId) {
      dispatch(getAllUserCases({ userId, token }))
    }
  }, [dispatch, casesStatus, userId, token])

  const refreshCasesList = () => {
    userId &&
      dispatch(getAllUserCases({ userId, token })).then(() => {
        enqueueSnackbar('Zaaktualizowano listę dokumentów', { variant: 'success' })
      })
  }

  return (
    <main className='bg-light min-h-[calc(100vh-76px)]'>
      <div className='mx-auto flex flex-row'>
        <section className='flex-[0.7]'>
          <DocumentsList data={cases} refreshCasesList={refreshCasesList} />
        </section>
        <section className='flex-[0.3]'>
          <ObservedDocuments />
        </section>
      </div>
    </main>
  )
}

export default Dashboard
