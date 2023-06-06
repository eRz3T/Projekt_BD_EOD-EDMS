import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { selectAuthToken } from '@/core/store/auth/authSelectors'

import CreateEditCategory from '@/features/admin/categories/createEditCategory/CreateEditCategory'
import CategoriesList from '@/features/admin/categories/categoriesList/CategoriesList'
import { getAllWorkflowCategories } from '@/core/store/workflowCategories/workflowCategoriesSlice'
import {
  selectAllWorkflowCategories,
  selectWorkflowCategoriesStatus,
} from '@/core/store/workflowCategories/workflowCategoriesSeclectors'

const Categories = () => {
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectAuthToken)
  const categoryStatus = useAppSelector(selectWorkflowCategoriesStatus)
  const categories = useAppSelector(selectAllWorkflowCategories)

  useEffect(() => {
    if (!!token && categoryStatus === 'idle') {
      dispatch(getAllWorkflowCategories(token))
    }
  }, [dispatch, token, categoryStatus])

  return (
    <main className='bg-light min-h-[calc(100vh-76px)]'>
      <div className='mx-auto flex flex-row'>
        <section className='flex-[0.65]'>
          <CategoriesList data={categories} />
        </section>
        <section className='flex-[0.35]'>
          <CreateEditCategory />
        </section>
      </div>
    </main>
  )
}

export default Categories
