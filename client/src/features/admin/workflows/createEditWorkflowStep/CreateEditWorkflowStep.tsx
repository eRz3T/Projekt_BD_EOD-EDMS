import { useEffect } from 'react'
import { useTranslations } from '@/shared/hooks/useTranslations'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Header from '@/shared/components/Header/Header'
import { Select } from '@/shared/components/Select/Select'
import Input from '@/shared/components/Input/Input'
import { ICreateEditStepForm, ICreateEditStepProps } from './CreateEditWorkflowStep.types'
import { createEditStepSchema } from './CreateEditWorkflowPath.utils'
import Button from '@/shared/components/Button/Button'
import { useAppSelector } from '@/shared/hooks/useStore'
import { selectStepToEdit } from '@/core/store/workflow/workflowSelectors'

interface newStep {
  step_name: string
  assign_to_user_id: string
  next_step_id: string
  previous_step_id: string
}

const CreateEditWorkflowStep = ({
  users,
  selectedWorkflow,
  workflowSteps,
  createStep,
  updateWorkflowStep,
}: ICreateEditStepProps) => {
  const { formatMessage } = useTranslations()
  const selectedStep = useAppSelector(selectStepToEdit)
  const userOptions = users.map((user) => ({
    name: `${user.first_name} ${user.last_name} | (${user.email})`,
    value: user.id,
  }))

  const workflowStepOptions = workflowSteps.map((step) => ({
    name: step.action,
    value: step.id,
  }))

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateEditStepForm>({
    resolver: yupResolver(createEditStepSchema),
  })

  const onStepDetailsSubmit = (data: ICreateEditStepForm) => {
    console.log({
      workflowId: selectedWorkflow?.id,
      userId: data.assignTo,
      stepNumber: workflowSteps.length + 1,
      previousStep: data.prevStep,
      action: data.stepName,
    })
    if (selectedStep) {
      updateWorkflowStep({
        stepId: selectedStep.id,
        userId: data.assignTo,
        previousStep: data.prevStep,
        action: data.stepName,
      })
    } else {
      createStep({
        workflowId: String(selectedWorkflow?.id),
        userId: data.assignTo,
        stepNumber: workflowSteps.length + 1,
        previousStep: data.prevStep,
        action: data.stepName,
      })
    }
  }

  useEffect(() => {
    if (selectedStep) {
      setValue('stepName', selectedStep?.action)
    } else {
      setValue('stepName', '')
    }
  }, [selectedStep])

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 min-h-[86vh] max-h-[86vh]'>
      <div className='flex flex-row items-center justify-between'>
        <Header
          title={selectedStep ? selectedStep.action : 'Krok'}
          subtitle={
            selectedStep
              ? `${formatMessage({ id: 'workflows.stepNumber' })}: ${selectedStep.step_number}`
              : 'Tworzenie/Edycja'
          }
        />
        <div className=' text-blueish text-3xl'>
          <i className='bx bxs-edit'></i>
        </div>
      </div>
      <div className=' border-b-[2.5px] border-gray-200'></div>

      {selectedWorkflow ? (
        <form className='flex flex-col' onSubmit={handleSubmit(onStepDetailsSubmit)}>
          <section className='mb-4'>
            <Input
              label={formatMessage({ id: 'workflows.stepName' })}
              name='stepName'
              placeholder={formatMessage({ id: 'workflows.provideStepName' })}
              register={register('stepName')}
              error={errors.stepName?.message}
            />
            <Select
              label={formatMessage({ id: 'workflows.assignTo' })}
              name='assignTo'
              options={userOptions}
              register={register}
            />
            <Select
              label={formatMessage({ id: 'workflows.canceledBackToStep' })}
              name='prevStep'
              options={workflowStepOptions}
              register={register}
            />
          </section>
          <Button
            text={formatMessage({ id: 'workflows.saveStep' })}
            variant='blueish'
            type='submit'
          />
        </form>
      ) : (
        <div className='flex text-2xl items-center justify-center mt-12'>Select workflow</div>
      )}
    </div>
  )
}

export default CreateEditWorkflowStep
