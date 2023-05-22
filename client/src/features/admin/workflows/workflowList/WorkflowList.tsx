import { useTranslations } from '@/shared/hooks/useTranslations'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Header from '@/shared/components/Header/Header'
import { Select } from '@/shared/components/Select/Select'
import Input from '@/shared/components/Input/Input'
import Tile from '@/shared/components/Tile/Tile'
import { IWorkflowFilters } from './WorkflowList.types'
import { workflowFiltersSchema } from './WorkflowList.utils'
import Button from '@/shared/components/Button/Button'

const WorkflowList = () => {
  const { formatMessage } = useTranslations()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWorkflowFilters>({
    resolver: yupResolver(workflowFiltersSchema),
  })

  const onFiltersSubmit = (data: IWorkflowFilters) => {
    console.log(data)
  }

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 min-h-full'>
      <div className='sticky top-0 right-0'>
        <Header
          title={formatMessage({ id: 'admin.adminPanel' })}
          subtitle={formatMessage({ id: 'admin.workflowPaths' })}
          addon={`${formatMessage({ id: 'workflows.allPaths' })}: 213`}
        />
        <div className='border-b-[2.5px] border-gray-200'></div>

        <form className='flex flex-col' onSubmit={handleSubmit(onFiltersSubmit)}>
          <section className='grid grid-cols-2 grid-rows-2 gap-2 mb-4'>
            <Select
              label={formatMessage({ id: 'searchBy' })}
              name='search-by'
              options={['Nazwa ścieżki', 'Indeks ścieżki']}
              register={register('searchBy')}
            />
            <Input
              label={formatMessage({ id: 'search' })}
              name='search'
              placeholder={formatMessage({ id: 'provideSearchPhrase' })}
              register={register('search')}
              isSearchBox
            />
            <Select
              label={formatMessage({ id: 'workflows.showCategoriesOnly' })}
              name='categories'
              options={['Wszystkie', 'Wnioski', 'Instrukcje', 'Plany']}
              register={register('category')}
            />
            <Select
              label={formatMessage({ id: 'sortBy' })}
              name='sort-by'
              options={['Nazwa ścieżki', 'Indeks ścieżki']}
              register={register('sortBy')}
            />
          </section>
          <Button
            text={formatMessage({ id: 'workflows.applyFilters' })}
            variant='blueish'
            type='submit'
          />
        </form>
        <div className='border-b-[2.5px] border-gray-200 my-4'></div>
      </div>

      <div className='flex flex-col'>
        <Tile
          title={'Dodaj nową ścieżkę'}
          adornment={<i className='bx bx-plus'></i>}
          variant='success'
          identifier='bg-green-400'
        />
        <Tile
          title={'Wniosek o wydanie paszportu'}
          subtitle={`${formatMessage({ id: 'workflows.pathIndex' })}: 1`}
          adornment={<i className='bx bxs-school'></i>}
          identifier='bg-blueish'
          variant='primary'
        />
        <Tile
          title={'Instrukcja obsługi MSTeams'}
          subtitle={`${formatMessage({ id: 'workflows.pathIndex' })}: 2`}
          adornment={<i className='bx bxs-school'></i>}
          identifier='bg-red-500'
          variant='primary'
        />
        <Tile
          title={'Wniosek o rejestrację pojazdu'}
          subtitle={`${formatMessage({ id: 'workflows.pathIndex' })}: 3`}
          adornment={<i className='bx bxs-school'></i>}
          identifier='bg-blueish'
          variant='primary-selected'
        />
      </div>
    </div>
  )
}

export default WorkflowList
