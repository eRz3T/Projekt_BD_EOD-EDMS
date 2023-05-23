import { useTranslations } from '@/shared/hooks/useTranslations'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Header from '@/shared/components/Header/Header'
import { Select } from '@/shared/components/Select/Select'
import Input from '@/shared/components/Input/Input'
import { ICreateEditStepForm } from './CreateEditWorkflowStep.types'
import { createEditStepSchema } from './CreateEditWorkflowPath.utils'
import Button from '@/shared/components/Button/Button'

const CreateEditWorkflowStep = () => {
  const { formatMessage } = useTranslations()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateEditStepForm>({
    resolver: yupResolver(createEditStepSchema),
  })

  const onStepDetailsSubmit = (data: ICreateEditStepForm) => {
    console.log(data)
  }

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 min-h-[86vh] max-h-[86vh]'>
      <div className='flex flex-row items-center justify-between'>
        <Header
          title={'Oczekiwanie na wydanie'}
          subtitle={`${formatMessage({ id: 'workflows.stepNumber' })}: 5`}
        />
        <div className=' text-blueish text-3xl'>
          <i className='bx bxs-edit'></i>
        </div>
      </div>
      <div className=' border-b-[2.5px] border-gray-200'></div>

      <form className='flex flex-col' onSubmit={handleSubmit(onStepDetailsSubmit)}>
        <section className='mb-4'>
          <Input
            label={formatMessage({ id: 'workflows.stepName' })}
            name='step-name'
            placeholder={formatMessage({ id: 'workflows.provideStepName' })}
            register={register('stepName')}
          />
          <Select
            label={formatMessage({ id: 'workflows.assignTo' })}
            name='assign-to'
            options={['Jan Kowalski', 'Anna Nowak', 'Renata Mazur']}
            register={register('assignTo')}
          />
          <Select
            label={formatMessage({ id: 'workflows.successNextStep' })}
            name='next-step'
            options={['Krok 2 - jakis opis', 'Krok 3 - jakis opis', 'Krok 4 - jakis opis']}
            register={register('nextStep')}
          />
          <Select
            label={formatMessage({ id: 'workflows.canceledBackToStep' })}
            name='prev-step'
            options={['Krok 2 - jakis opis', 'Krok 3 - jakis opis', 'Krok 4 - jakis opis']}
            register={register('prevStep')}
          />
        </section>
        <Button
          text={formatMessage({ id: 'workflows.saveStep' })}
          variant='blueish'
          type='submit'
        />
      </form>
    </div>
  )
}

export default CreateEditWorkflowStep
