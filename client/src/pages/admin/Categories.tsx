import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { selectAuthToken } from '@/core/store/auth/authSelectors'

import CreateEditCategory from '@/features/admin/categories/createEditCategory/CreateEditCategory'
import CategoriesList from '@/features/admin/categories/categoriesList/CategoriesList'

export interface ICategory {
  name: string
  IDColor: string
  icon: string
}

const Categories = () => {
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectAuthToken)

  const categories: ICategory[] = [
    {
      name: 'Wnioski',
      IDColor: '#e67e22',
      icon: 'bxs-school',
    },
    {
      name: 'Plany',
      IDColor: '#2980b9',
      icon: 'bxs-save',
    },
    {
      name: 'Instrukcje',
      IDColor: '#27ae60',
      icon: 'bx-list-ul',
    },
    {
      name: 'Podania',
      IDColor: '#9b59b6',
      icon: 'bx-box',
    },
  ]

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
