import Button from '@/shared/components/Button/Button'
import Header from '@/shared/components/Header/Header'
import Input from '@/shared/components/Input/Input'
import { Select } from '@/shared/components/Select/Select'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

interface INewWorkflowFormProps {
  closeModal: () => void
  categoryOptions: {
    name: string
    value: string
  }[]
  createWorkflow: (workflowName: string, categoryId: string) => Promise<void>
}

interface INewWorkflowForm {
  name: string
  category: string
}

const newWorkflowFormSchema = yup.object().shape({
  name: yup.string().required('Wprowadź nazwę ścieżki'),
  category: yup.string(),
})

export const NewWorkflowForm = ({
  closeModal,
  categoryOptions,
  createWorkflow,
}: INewWorkflowFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewWorkflowForm>({
    resolver: yupResolver(newWorkflowFormSchema),
  })

  const onFormSubmit = async (data: INewWorkflowForm) => {
    await createWorkflow(data.name, data.category).then(() => {
      reset()
      closeModal()
    })
  }

  return (
    <div className='p-10 flex flex-col'>
      <div className='flex flex-row items-center justify-between'>
        <Header title='Utwórz nową ścieżkę' />
        <i className='bx bx-x text-3xl cursor-pointer' onClick={closeModal}></i>
      </div>
      <div className='border-b-[2.5px] border-gray-200 my-1'></div>
      <form className='flex flex-col' onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          label={'Nazwa ścieżki'}
          name='name'
          placeholder={'Wpisz nazwę dla ścieżki'}
          register={register('name')}
          error={errors.name?.message}
        />
        <Select
          label={'Wybierz kategorię'}
          name='category'
          options={categoryOptions}
          register={register}
          error={errors.category?.message}
        />
        <div className='my-4'></div>
        <Button text={'Dodaj ścieżkę'} variant='blueish' type='submit' />
      </form>
    </div>
  )
}
