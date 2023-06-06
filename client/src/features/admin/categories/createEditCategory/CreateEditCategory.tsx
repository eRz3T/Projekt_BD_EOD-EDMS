import { useTranslations } from '@/shared/hooks/useTranslations'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Header from '@/shared/components/Header/Header'
import Input from '@/shared/components/Input/Input'
import { ColorPicker } from '@/shared/components/ColorPicker/ColorPicker'
import { useEffect, useState } from 'react'
import { IconPicker } from '@/shared/components/IconPicker/IconPicker'
import { ICategory } from '@/shared/types/workflows'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import {
  selectCategoryToEdit,
  selectWorkflowCategoryAction,
} from '@/core/store/workflowCategories/workflowCategoriesSeclectors'
import {
  createWorkflowCategory,
  getAllWorkflowCategories,
  setWorkflowCategoryAction,
  setWorkflowCategoryToEdit,
} from '@/core/store/workflowCategories/workflowCategoriesSlice'
import { selectAuthToken } from '@/core/store/auth/authSelectors'
import { enqueueSnackbar } from 'notistack'
import { updateCategory } from '@/core/api/httpApi'

const CreateEditCategory = () => {
  const dispatch = useAppDispatch()
  const { formatMessage } = useTranslations()
  const [selectedColor, setSelectedColor] = useState<string>('#b0b0b0')
  const [selectedIcon, setSelectedIcon] = useState<string>('bxs-school')
  const token = useAppSelector(selectAuthToken)
  const actionType = useAppSelector(selectWorkflowCategoryAction)
  const categoryToEdit = useAppSelector(selectCategoryToEdit)

  const workflowCategoryFormSchema = yup.object().shape({
    name: yup.string().required('Wprowadź nazwę kategorii'),
  })

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(workflowCategoryFormSchema),
  })

  const handleEditCancel = () => {
    dispatch(setWorkflowCategoryAction('create'))
    dispatch(setWorkflowCategoryToEdit(null))
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon)
  }

  const onFormSubmit = async (data: ICategory) => {
    try {
      if (token) {
        if (actionType === 'create') {
          dispatch(
            createWorkflowCategory({
              name: data.name,
              color: selectedColor,
              icon: selectedIcon,
            })
          )
            .then(() => dispatch(getAllWorkflowCategories(token)))
            .finally(() => {
              enqueueSnackbar('Nowy kategoria została utworzona', { variant: 'success' })
            })
        } else {
          if (categoryToEdit) {
            await updateCategory(data.name, selectedColor, selectedIcon, categoryToEdit.id)
              .then(() => dispatch(getAllWorkflowCategories(token)))
              .finally(() => {
                enqueueSnackbar('Categoria została zedytowana', { variant: 'success' })
              })
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (categoryToEdit) {
      setValue('name', categoryToEdit.name)
      setSelectedColor(categoryToEdit.color)
      setSelectedIcon(categoryToEdit.icon)
    } else {
      reset()
    }
  }, [categoryToEdit])

  return (
    <div className='overflow-x-auto bg-white m-4 rounded-md h-full'>
      <div
        className={`px-3 py-5 w-full rounded-t-md flex items-center justify-between text-white ${
          actionType === 'create' ? 'bg-blueish' : 'bg-yellow-400'
        }`}
      >
        <Header
          title={actionType === 'create' ? 'Utwórz nową kategorie' : 'Edytuj kategorie'}
          icon={'bx-category'}
        />
        {actionType === 'edit' && (
          <button
            className='bg-red-400 text-white text-sm px-4 py-2 rounded-md font-medium'
            onClick={handleEditCancel}
          >
            {formatMessage({ id: 'cancel' })}
          </button>
        )}
      </div>

      <div className='flex flex-col gap-3 p-3'>
        <form
          className='flex flex-col w-4/5 mx-auto max-w-sm'
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Input
            label={formatMessage({ id: 'categories.categoryName' })}
            name='firstName'
            placeholder={formatMessage({ id: 'categories.provideCategoryName' })}
            register={register('name')}
            error={errors?.name?.message}
          />
          <ColorPicker
            label={formatMessage({ id: 'categories.IDColor' })}
            selectedColor={selectedColor}
            onColorSelect={handleColorSelect}
          />
          <IconPicker
            label={formatMessage({ id: 'categories.assignIcon' })}
            selectedIcon={selectedIcon}
            onIconSelect={handleIconSelect}
          />
          <button
            type='submit'
            className={
              'bg-green-400 text-white font-medium focus:outline-none rounded-md py-2 mt-8 text-lg'
            }
          >
            {actionType === 'create' ? 'Dodaj kategorię' : 'Edytuj kategorię'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateEditCategory
