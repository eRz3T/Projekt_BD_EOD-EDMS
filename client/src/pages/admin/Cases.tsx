import { useEffect } from 'react'
import { selectAuthToken } from '@/core/store/auth/authSelectors'
import { selectAdminCases } from '@/core/store/cases/casesSelectors'
import { getAllAdminCases } from '@/core/store/cases/casesSlice'
import { CasesList } from '@/features/admin/cases/casesList/CasesList'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import CreateEditCase from '@/features/admin/cases/createEditCase/CreateEditCase'
import { getAllWorkflows } from '@/core/store/workflow/workflowSlice'
import { selectAllWorkflows, selectWorkflowStatus } from '@/core/store/workflow/workflowSelectors'

const Cases = () => {
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectAuthToken)
  const cases = useAppSelector(selectAdminCases)
  const workflowStatus = useAppSelector(selectWorkflowStatus)
  const workflows = useAppSelector(selectAllWorkflows)

  useEffect(() => {
    if (!!token) {
      dispatch(getAllAdminCases(token))
    }
  }, [dispatch, token])

  useEffect(() => {
    if (!!token && workflowStatus === 'idle') {
      dispatch(getAllWorkflows({ token }))
    }
  }, [dispatch, token, workflowStatus])

  return (
    <main className='bg-light min-h-[calc(100vh-76px)]'>
      <div className='mx-auto flex flex-row'>
        <section className='flex-[0.65]'>
          <CasesList data={cases} />
        </section>
        <section className='flex-[0.35]'>
          <CreateEditCase workflows={workflows} />
        </section>
      </div>
    </main>
  )
}

export default Cases
