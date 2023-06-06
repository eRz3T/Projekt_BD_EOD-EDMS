import { createNewWorkflow } from '@/core/api/httpApi'
import { selectAuthToken } from '@/core/store/auth/authSelectors'
import { selectAllUsers, selectUsersStatus } from '@/core/store/users/usersSelectors'
import { getAllUsers } from '@/core/store/users/usersSlice'
import {
  selectAllWorkflows,
  selectWorkflowStatus,
  selectWorkflowSteps,
  selectWorkflowToEdit,
} from '@/core/store/workflow/workflowSelectors'
import {
  createWorkflowStep,
  getAllWorkflows,
  getWorkflowSteps,
  updateStep,
} from '@/core/store/workflow/workflowSlice'
import {
  selectAllWorkflowCategories,
  selectWorkflowCategoriesStatus,
} from '@/core/store/workflowCategories/workflowCategoriesSeclectors'
import { getAllWorkflowCategories } from '@/core/store/workflowCategories/workflowCategoriesSlice'
import CreateEditWorkflowPath from '@/features/admin/workflows/createEditWorkflowPath/CreateEditWorkflowPath'
import CreateEditWorkflowStep from '@/features/admin/workflows/createEditWorkflowStep/CreateEditWorkflowStep'
import WorkflowList from '@/features/admin/workflows/workflowList/WorkflowList'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'

const Workflows = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectAuthToken)

  const categoryStatus = useAppSelector(selectWorkflowCategoriesStatus)
  const categories = useAppSelector(selectAllWorkflowCategories)
  const workflowStatus = useAppSelector(selectWorkflowStatus)
  const workflows = useAppSelector(selectAllWorkflows)
  const usersStatus = useAppSelector(selectUsersStatus)
  const users = useAppSelector(selectAllUsers)
  const selectedWorkflow = useAppSelector(selectWorkflowToEdit)
  const workflowSteps = useAppSelector(selectWorkflowSteps)

  const getFilteredWorkflows = (workflowName?: string, workflowId?: string) => {
    if (!!token) {
      dispatch(getAllWorkflows({ token, workflowName, workflowId }))
    }
  }

  const createWorkflow = async (workflowName: string, categoryId: string) => {
    workflowName &&
      categoryId &&
      token &&
      (await createNewWorkflow(workflowName, categoryId)
        .then(() => {
          dispatch(getAllWorkflows({ token }))
          enqueueSnackbar('Stworzono nową ścieżkę, dodaj kroki', { variant: 'success' })
        })
        .catch(() => {
          enqueueSnackbar('Błąd w trakcie tworzenia ścieżki')
        }))
  }

  const createStep = async ({
    workflowId,
    userId,
    stepNumber,
    previousStep,
    action,
  }: {
    workflowId: string
    userId: string
    stepNumber: number
    previousStep: string
    action: string
  }) => {
    token &&
      selectedWorkflow &&
      (await dispatch(
        createWorkflowStep({
          workflowId,
          userId,
          stepNumber,
          previousStep,
          action,
        })
      )
        .then(() => {
          enqueueSnackbar('Dodano krok do ścieżki', { variant: 'success' })
          dispatch(getWorkflowSteps({ token, workflowId: selectedWorkflow?.id }))
        })
        .catch(() => {
          enqueueSnackbar('Błąd dodawania korku', { variant: 'error' })
        }))
  }

  const updateWorkflowStep = async ({
    stepId,
    userId,
    previousStep,
    action,
  }: {
    stepId: string
    userId: string
    previousStep: string
    action: string
  }) => {
    token &&
      selectedWorkflow &&
      dispatch(
        updateStep({
          stepId,
          userId,
          previousStep,
          action,
        })
      )
        .then(() => {
          enqueueSnackbar('Dodano krok do ścieżki', { variant: 'success' })
          dispatch(getWorkflowSteps({ token, workflowId: selectedWorkflow?.id }))
        })
        .catch(() => {
          enqueueSnackbar('Błąd aktualizowania korku', { variant: 'error' })
        })
  }

  useEffect(() => {
    if (!!token && categoryStatus === 'idle') {
      dispatch(getAllWorkflowCategories(token))
    }
  }, [dispatch, token, categoryStatus])

  useEffect(() => {
    if (!!token && workflowStatus === 'idle') {
      dispatch(getAllWorkflows({ token }))
    }
  }, [dispatch, token, workflowStatus])

  useEffect(() => {
    if (!!token && usersStatus === 'idle') {
      dispatch(getAllUsers(token))
    }
  }, [dispatch, token, usersStatus])

  useEffect(() => {
    if (!!token && selectedWorkflow) {
      dispatch(getWorkflowSteps({ token, workflowId: selectedWorkflow?.id }))
    }
  }, [token, selectedWorkflow, dispatch])

  return (
    <main className='bg-light min-h-[calc(100vh-76px)] overflow-y-hidden'>
      <div className='mx-auto flex flex-row'>
        <section className='flex-[0.35]'>
          <WorkflowList
            categories={categories}
            workflows={workflows}
            getFilteredWorkflows={getFilteredWorkflows}
            createWorkflow={createWorkflow}
          />
        </section>
        <section className='flex-[0.35]'>
          <CreateEditWorkflowPath
            categories={categories}
            workflowSteps={workflowSteps}
            selectedWorkflow={selectedWorkflow}
          />
        </section>
        <section className='flex-[0.30]'>
          <CreateEditWorkflowStep
            users={users}
            selectedWorkflow={selectedWorkflow}
            workflowSteps={workflowSteps}
            createStep={createStep}
            updateWorkflowStep={updateWorkflowStep}
          />
        </section>
      </div>
    </main>
  )
}

export default Workflows
