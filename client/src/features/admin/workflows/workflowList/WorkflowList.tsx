import { useEffect, useState } from 'react'
import { useTranslations } from '@/shared/hooks/useTranslations'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Header from '@/shared/components/Header/Header'
import { Select } from '@/shared/components/Select/Select'
import Input from '@/shared/components/Input/Input'
import Tile from '@/shared/components/Tile/Tile'
import { IWorkflowFilters, IWorkflowListProps } from './WorkflowList.types'
import { workflowFiltersSchema } from './WorkflowList.utils'
import Button from '@/shared/components/Button/Button'
import Modal from '@/shared/components/Modal/Modal'
import { NewWorkflowForm } from './newWorkflowForm/NewWorkflowForm'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { selectWorkflowToEdit } from '@/core/store/workflow/workflowSelectors'
import { setStepToEdit, setWorkflowToEdit } from '@/core/store/workflow/workflowSlice'
import { IWorkflow } from '@/shared/types/workflows'

const WorkflowList = ({
  categories,
  workflows,
  getFilteredWorkflows,
  createWorkflow,
}: IWorkflowListProps) => {
  const dispatch = useAppDispatch()
  const { formatMessage } = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const selectedWorkflow = useAppSelector(selectWorkflowToEdit)

  const categoryOptions = categories.map((category) => ({
    name: category.name,
    value: category.id,
  }))

  const { register, handleSubmit } = useForm<IWorkflowFilters>({
    resolver: yupResolver(workflowFiltersSchema),
  })

  const onFiltersSubmit = (data: IWorkflowFilters) => {
    getFilteredWorkflows(data.search, data.category)
  }

  const handleWorkflowSelect = (workflow: IWorkflow) => {
    dispatch(setWorkflowToEdit(workflow))
    dispatch(setStepToEdit(null))
  }

  const categoryOptionsWithAll = [{ name: 'Wszystkie', value: '' }, ...categoryOptions]

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 min-h-[86vh] max-h-[86vh]'>
      <div className='sticky top-4 bg-white z-50'>
        <Header
          title={formatMessage({ id: 'admin.adminPanel' })}
          subtitle={formatMessage({ id: 'admin.workflowPaths' })}
          addon={`${formatMessage({ id: 'workflows.allPaths' })}: ${workflows.length}`}
        />
        <div className='border-b-[2.5px] border-gray-200'></div>

        <form className='flex flex-col' onSubmit={handleSubmit(onFiltersSubmit)}>
          <section className='grid grid-cols-2 gap-2 mb-4'>
            <Select
              label={formatMessage({ id: 'workflows.showCategoriesOnly' })}
              name='category'
              options={categoryOptionsWithAll}
              register={register}
            />
            <Input
              label={formatMessage({ id: 'search' })}
              name='search'
              placeholder={formatMessage({ id: 'provideSearchPhrase' })}
              register={register('search')}
              isSearchBox
            />
          </section>
          <Button
            text={formatMessage({ id: 'workflows.applyFilters' })}
            variant='blueish'
            type='submit'
          />
        </form>
        <div className='border-b-[2.5px] border-gray-200 my-4'></div>
        <Tile
          title={'Dodaj nową ścieżkę'}
          adornment={<i className='bx bx-plus'></i>}
          variant='success'
          identifier='bg-green-400'
          onClick={() => setIsModalOpen(true)}
        />
        <div className='border-b-[2.5px] border-gray-200 my-4'></div>
      </div>

      <div className='flex flex-col z-10'>
        {workflows.length > 0 &&
          workflows.map((workflow, index) => (
            <div key={workflow.id} onClick={() => handleWorkflowSelect(workflow)}>
              <Tile
                title={workflow.name}
                subtitle={`${formatMessage({ id: 'workflows.pathIndex' })}: ${index + 1}`}
                variant={selectedWorkflow?.id === workflow.id ? 'primary-selected' : 'primary'}
                adornment={<i className={`bx ${workflow.category_icon}`}></i>}
                identifier={workflow.category_color}
              />
            </div>
          ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewWorkflowForm
          createWorkflow={createWorkflow}
          closeModal={() => setIsModalOpen(false)}
          categoryOptions={categoryOptions}
        />
      </Modal>
    </div>
  )
}

export default WorkflowList
