import { useState } from 'react'
import { useTranslations } from '@/shared/hooks/useTranslations'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import Header from '@/shared/components/Header/Header'
import { Select } from '@/shared/components/Select/Select'
import Tile from '@/shared/components/Tile/Tile'
import {
  ICreateEditWorkflowProps,
  ICreateEditWorkflowSettings,
} from './CreateEditWorkflowPath.types'
import { createEditSettingsSchema } from './CreateEditWorkflowPath.utils'
import Button from '@/shared/components/Button/Button'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { setStepToEdit } from '@/core/store/workflow/workflowSlice'
import { selectStepToEdit } from '@/core/store/workflow/workflowSelectors'
import { IWorkflowStep } from '@/shared/types/workflows'

const CreateEditWorkflowPath = ({
  categories,
  workflowSteps,
  selectedWorkflow,
}: ICreateEditWorkflowProps) => {
  const [isCreatingNewStep, setIsCreatingNewStep] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const selectedStep = useAppSelector(selectStepToEdit)
  const { formatMessage } = useTranslations()
  const [parent] = useAutoAnimate()

  const categoryOptions = categories.map((category) => ({
    name: category.name,
    value: category.id,
  }))

  const { register, handleSubmit } = useForm<ICreateEditWorkflowSettings>({
    resolver: yupResolver(createEditSettingsSchema),
    defaultValues: {
      action: 'create',
      category: selectedWorkflow ? selectedWorkflow.category_name : '',
    },
  })

  const onSettingsSubmit = (data: ICreateEditWorkflowSettings) => {
    console.log(data)
  }

  const handleNewStep = () => {
    if (selectedWorkflow) {
      dispatch(setStepToEdit(null))
      setIsCreatingNewStep(true)
    }
  }

  const handleSelectStep = (step: IWorkflowStep) => {
    dispatch(setStepToEdit(step))
    setIsCreatingNewStep(false)
  }

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 min-h-[86vh] max-h-[86vh]'>
      <div className='sticky top-4 z-50 bg-white'>
        <Header
          title={selectedWorkflow ? selectedWorkflow.name : 'Wybierz ścieżkę'}
          subtitle={
            selectedWorkflow
              ? `${formatMessage({ id: 'workflows.dateOfCreation' })}: ${moment(
                  selectedWorkflow.created_at
                ).format('YYYY-MM-DD')}`
              : 'Edycja/Usuwanie'
          }
        />
        <div className=' border-b-[2.5px] border-gray-200'></div>

        <form className='flex flex-col' onSubmit={handleSubmit(onSettingsSubmit)}>
          <section className='grid grid-cols-2 grid-rows-1 gap-2 mb-4'>
            <Select
              label={formatMessage({ id: 'category' })}
              name='category'
              options={categoryOptions}
              defaultOption={
                selectedWorkflow
                  ? { name: selectedWorkflow.category_name, value: selectedWorkflow.category_id }
                  : { name: 'Wszystkie', value: '' }
              }
              register={register}
            />
            <Select
              label={formatMessage({ id: 'action' })}
              name='action'
              options={[
                { name: 'Edytuj', value: 'edit' },
                { name: 'Usuń', value: 'delete' },
              ]}
              register={register}
            />
          </section>
          <Button
            text={formatMessage({ id: 'workflows.savePathState' })}
            variant='blueish'
            type='submit'
          />
        </form>
        <div className='border-b-[2.5px] border-gray-200 my-4'></div>
        <Tile
          title={'Dodaj następny krok'}
          adornment={<i className='bx bx-plus'></i>}
          variant='success'
          identifier='bg-green-400'
          onClick={() => handleNewStep()}
        />
        <div className='border-b-[2.5px] border-gray-200 my-4'></div>
      </div>

      <div className='flex flex-col z-10' ref={parent}>
        {workflowSteps.length > 0 &&
          [...workflowSteps]
            .sort((a, b) => a.step_number - b.step_number)
            .map((step) => (
              <div key={step.id} onClick={() => handleSelectStep(step)}>
                <Tile
                  title={step.action}
                  subtitle={step.assigned_user}
                  adornment={<div className='px-2 -mt-1'>{step.step_number}</div>}
                  variant={step.id === selectedStep?.id ? 'full-selected' : 'primary'}
                />
              </div>
            ))}
        {isCreatingNewStep && (
          <Tile
            title={'Nowy krok'}
            subtitle={'Uzupełnij formularz'}
            adornment={<div className='px-2 -mt-1'>{workflowSteps.length + 1}</div>}
            variant={'full-selected'}
          />
        )}
      </div>
    </div>
  )
}

export default CreateEditWorkflowPath
