import { useTranslations } from '@/shared/hooks/useTranslations'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Header from '@/shared/components/Header/Header'
import { ICategory } from '@/pages/admin/Categories'
import { createCategorySchema } from './CreateEditCategory.utils'
import Input from '@/shared/components/Input/Input'
import { Select } from '@/shared/components/Select/Select'
import { ColorPicker } from '@/shared/components/ColorPicker/ColorPicker'
import { useState } from 'react'
import { IconPicker } from '@/shared/components/IconPicker/IconPicker'

const CreateEditCategory = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#b0b0b0')
  const [selectedIcon, setSelectedIcon] = useState<string>('bxs-school')
  const actionType = 'create'
  const { formatMessage } = useTranslations()

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(createCategorySchema),
  })

  const handleEditCancel = () => {}

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon)
  }

  const onFormSubmit = (data: ICategory) => {
    console.log(data)
  }

  return (
    <div className='overflow-x-auto bg-white m-4 rounded-md h-full'>
      <div
        className={`px-3 py-5 w-full rounded-t-md flex items-center justify-between text-white ${
          actionType === 'create' ? 'bg-blueish' : 'bg-yellow-400'
        }`}
      >
        <Header title='Utwórz nową kategorie' icon={'bx-category'} />
        {/* {actionType === 'edit' && (
          <button
            className='bg-red-400 text-white text-sm px-4 py-2 rounded-md font-medium'
            onClick={handleEditCancel}
          >
            {formatMessage({ id: 'cancel' })}
          </button>
        )} */}
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
            {actionType === 'create'
              ? formatMessage({ id: 'users.createUser' })
              : formatMessage({ id: 'users.editUser' })}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateEditCategory
