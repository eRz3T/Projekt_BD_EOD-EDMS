import Header from '@/shared/components/Header/Header'
import { enqueueSnackbar, useSnackbar } from 'notistack'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '@/shared/components/Input/Input'
import { CreateEditCaseForm, CreateEditCaseProps } from './CreateEditCase.types'
import { Select } from '@/shared/components/Select/Select'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { selectCaseActionType, selectCaseToEdit } from '@/core/store/cases/casesSelectors'
import {
  createCase,
  getAllAdminCases,
  setCaseActionType,
  setCaseToEdit,
} from '@/core/store/cases/casesSlice'
import { selectAuthToken, selectUser } from '@/core/store/auth/authSelectors'
import { useEffect } from 'react'

const createCaseSchema = yup.object().shape({
  caseTitle: yup.string().required('Wprowadź tytuł sprawy'),
  caseDescription: yup.string().required('Wprowadź opis sprawy'),
  caseWorkflow: yup.string().required('Wprowadź opis sprawy'),
})

const editCaseSchema = yup.object().shape({
  caseTitle: yup.string(),
  caseDescription: yup.string(),
  caseWorkflow: yup.string(),
})

const CreateEditCase = ({ workflows }: CreateEditCaseProps) => {
  const dispatch = useAppDispatch()
  const workflowOptions = workflows.map((workflow) => ({
    name: workflow.name,
    value: workflow.id,
  }))
  const caseToEdit = useAppSelector(selectCaseToEdit)
  const actionType = useAppSelector(selectCaseActionType)
  const token = useAppSelector(selectAuthToken)
  const user = useAppSelector(selectUser)

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEditCaseForm>({
    resolver: yupResolver(actionType === 'create' ? createCaseSchema : editCaseSchema),
  })

  const handleEditCancel = () => {
    dispatch(setCaseToEdit(null))
    dispatch(setCaseActionType('create'))
    reset()
  }

  const onFormSubmit = (data: CreateEditCaseForm) => {
    if (!!token) {
      if (actionType === 'create') {
        dispatch(
          createCase({
            assignedUserId: String(user?.id),
            createdBy: String(user?.id),
            title: data.caseTitle,
            description: data.caseDescription,
            workflowId: data.caseWorkflow,
          })
        )
          .then(() => {
            enqueueSnackbar('Utworzono nową sprawę', { variant: 'success' })
          })
          .finally(() => {
            dispatch(getAllAdminCases(token))
            reset()
          })
      } else {
        console.log({
          title: data.caseTitle,
          description: data.caseDescription,
          workflowId: data.caseWorkflow,
        })
      }
    }
  }

  useEffect(() => {
    if (caseToEdit) {
      setValue('caseTitle', caseToEdit.title)
      setValue('caseDescription', caseToEdit.description)
    }
  }, [caseToEdit])

  return (
    <div className='bg-white m-4 h-full rounded-md '>
      <div
        className={`px-3 py-5 w-full rounded-t-md flex items-center justify-between text-white ${
          actionType === 'create' ? 'bg-blueish' : 'bg-yellow-400'
        }`}
      >
        <Header
          title={actionType === 'create' ? 'Utwórz nową sprawę' : 'Edytuj sprawę'}
          icon='bx-file'
        />
        {actionType !== 'create' && (
          <button
            className='bg-red-400 text-white text-sm px-4 py-2 rounded-md font-medium'
            onClick={handleEditCancel}
          >
            Cancel
          </button>
        )}
      </div>
      <div className='flex flex-col gap-3 p-3'>
        <form
          className='flex flex-col w-4/5 mx-auto max-w-sm'
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Input
            label={'Tytuł sprawy'}
            name='caseTitle'
            placeholder={'Wprowadź tytuł sprawy'}
            register={register('caseTitle')}
            error={errors.caseTitle?.message}
          />
          <div className='flex flex-col'>
            <label
              htmlFor={'caseDescription'}
              className='mb-2 mt-4 text-lg text-primary font-medium'
            >
              Opis sprawy{' '}
              <span className='text-sm text-red-500'>
                {errors.caseDescription?.message && errors.caseDescription?.message.toString()}
              </span>
            </label>
            <textarea
              {...register('caseDescription')}
              name='caseDescription'
              id='caseDescription'
              placeholder='Wytłumacz na czym polega sprawa ...'
              className='border-solid border-2 rounded-md p-3'
              cols={26}
              rows={8}
            ></textarea>
          </div>
          <Select
            label={'Ścieżka obiegu'}
            name='caseWorkflow'
            options={workflowOptions}
            register={register}
            error={errors.caseWorkflow?.message}
            defaultOption={
              caseToEdit && {
                name: caseToEdit.assigned_workflow_name,
                value: caseToEdit.assigned_workflow_id,
              }
            }
          />
          <button
            type='submit'
            className={
              'bg-green-400 text-white font-medium focus:outline-none rounded-md py-2 mt-8 text-lg'
            }
          >
            {actionType === 'create' ? 'Utwórz sprawę' : 'Edytuj sprawę'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateEditCase
