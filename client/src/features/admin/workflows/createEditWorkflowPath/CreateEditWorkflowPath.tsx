import { useTranslations } from '@/shared/hooks/useTranslations'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import Header from '@/shared/components/Header/Header'
import { Select } from '@/shared/components/Select/Select'
import Tile from '@/shared/components/Tile/Tile'
import { ICreateEditWorkflowSettings } from './CreateEditWorkflowPath.types'
import { createEditSettingsSchema } from './CreateEditWorkflowPath.utils'
import Button from '@/shared/components/Button/Button'
import { useState } from 'react'

export interface IWorkflowPath {
  index: number
  title: string
  assignedTo: string
}

const paths: IWorkflowPath[] = [
  {
    index: 1,
    title: 'Utworzenie dokumentu',
    assignedTo: 'Wydział komunikacji',
  },
  {
    index: 2,
    title: 'Zatwierdzenie treści dokumentu',
    assignedTo: 'Kierownik wydziału komunikacji',
  },
  {
    index: 3,
    title: 'Oczekiwanie na wykonanie',
    assignedTo: 'Wydział komunikacji',
  },
  {
    index: 9,
    title: 'Wykonano',
    assignedTo: 'Wydział komunikacji',
  },
  {
    index: 7,
    title: 'Wykonano',
    assignedTo: 'Wydział komunikacji',
  },
  {
    index: 8,
    title: 'Wykonano',
    assignedTo: 'Wydział komunikacji',
  },
  {
    index: 11,
    title: 'Wykonano',
    assignedTo: 'Wydział komunikacji',
  },
  {
    index: 5,
    title: 'Do wydania',
    assignedTo: 'Recepcja starostwa',
  },
]

const CreateEditWorkflowPath = () => {
  const { formatMessage } = useTranslations()
  const [parent] = useAutoAnimate()
  const [workflowPaths, setWorkflowPath] = useState<IWorkflowPath[]>(paths)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateEditWorkflowSettings>({
    resolver: yupResolver(createEditSettingsSchema),
  })

  const onSettingsSubmit = (data: ICreateEditWorkflowSettings) => {
    console.log(data)
  }

  const onAddNewStep = () => {}

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 min-h-[86vh] max-h-[86vh]'>
      <div className='sticky top-4 z-50 bg-white'>
        <Header
          title={'Wnioski o rejestrację pojazdu'}
          subtitle={`${formatMessage({ id: 'workflows.dateOfCreation' })}: 2023-04-23`}
          addon={`${formatMessage({ id: 'workflows.pathIndex' })}: 3`}
        />
        <div className=' border-b-[2.5px] border-gray-200'></div>

        <form className='flex flex-col' onSubmit={handleSubmit(onSettingsSubmit)}>
          <section className='grid grid-cols-2 grid-rows-1 gap-2 mb-4'>
            <Select
              label={formatMessage({ id: 'category' })}
              name='category'
              options={['Wnioski', 'Plany', 'Instrukcje']}
              register={register('category')}
            />
            <Select
              label={formatMessage({ id: 'action' })}
              name='action'
              options={['Utwórz', 'Edytuj', 'Usuń']}
              register={register('action')}
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
          onClick={onAddNewStep}
        />
        <div className='border-b-[2.5px] border-gray-200 my-4'></div>
      </div>

      <div className='flex flex-col z-10' ref={parent}>
        {workflowPaths.length > 0 &&
          workflowPaths.map((path, index) => {
            return (
              <Tile
                key={path.index + index}
                title={path.title}
                subtitle={path.assignedTo}
                adornment={<div className='px-2 -mt-1'>{path.index}</div>}
                variant='primary'
              />
            )
          })}
      </div>
    </div>
  )
}

export default CreateEditWorkflowPath
