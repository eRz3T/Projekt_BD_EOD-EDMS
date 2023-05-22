import { useTranslations } from '@/shared/hooks/useTranslations'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Header from '@/shared/components/Header/Header'
import { Select } from '@/shared/components/Select/Select'
import Tile from '@/shared/components/Tile/Tile'
import { ICreateEditWorkflowSettings } from './CreateEditWorkflowPath.types'
import { createEditSettingsSchema } from './CreateEditWorkflowPath.utils'
import Button from '@/shared/components/Button/Button'

const CreateEditWorkflowPath = () => {
  const { formatMessage } = useTranslations()

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

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 h-full'>
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

      <div className='flex flex-col'>
        <Tile
          title={'Dodaj następny krok'}
          adornment={<i className='bx bx-plus'></i>}
          variant='success'
          identifier='bg-green-400'
        />
        <Tile
          title={'Utworzenie dokumentu'}
          subtitle={'Wydział komunikacji'}
          adornment={<div className='px-2 -mt-1'>1</div>}
          variant='primary'
        />
        <Tile
          title={'Zatwierdzenie treści dokumentu'}
          subtitle={'Kierownik wydziału komunikacji'}
          adornment={<div className='px-2 -mt-1'>2</div>}
          variant='primary'
        />
        <Tile
          title={'Oczekiwanie na wykonanie'}
          subtitle={'Wydział komunikacji'}
          adornment={<div className='px-2 -mt-1'>3</div>}
          variant='primary'
        />

        <Tile
          title={'Wykonano'}
          subtitle={'Wydział komunikacji'}
          adornment={<div className='px-2 -mt-1'>4</div>}
          variant='primary'
        />
        <Tile
          title={'Oczekiwanie na wydanie dokumentu'}
          subtitle={'Recepcja'}
          adornment={<div className='px-2 -mt-1'>5</div>}
          variant='full-selected'
        />
      </div>
    </div>
  )
}

export default CreateEditWorkflowPath
