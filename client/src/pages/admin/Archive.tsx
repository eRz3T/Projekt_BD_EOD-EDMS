import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { selectAuthToken } from '@/core/store/auth/authSelectors'
import { selectArchivedCases } from '@/core/store/cases/casesSelectors'
import { getAllArchivedCases } from '@/core/store/cases/casesSlice'
import { CasesList } from '@/features/admin/cases/casesList/CasesList'

const Archive = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectAuthToken)
  const archivedCases = useAppSelector(selectArchivedCases)

  useEffect(() => {
    if (!!token) {
      dispatch(getAllArchivedCases(token))
    }
  }, [dispatch, token])

  return (
    <main className='bg-light min-h-[calc(100vh-76px)]'>
      <div className='mx-auto flex flex-row w-3/4'>
        <section className='flex-1'>
          <CasesList data={archivedCases} noActions />
        </section>
      </div>
    </main>
  )
}

export default Archive
