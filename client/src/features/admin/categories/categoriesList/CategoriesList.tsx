import Header from '@/shared/components/Header/Header'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ICategory } from '@/shared/types/workflows'
import { useAppDispatch } from '@/shared/hooks/useStore'
import {
  setWorkflowCategoryAction,
  setWorkflowCategoryToEdit,
} from '@/core/store/workflowCategories/workflowCategoriesSlice'

const CategoriesList = ({ data }: { data: ICategory[] }) => {
  const dispatch = useAppDispatch()
  const [parent] = useAutoAnimate()

  const handleEditCategory = ({ id, name, color, icon }: ICategory) => {
    dispatch(setWorkflowCategoryAction('edit'))
    dispatch(setWorkflowCategoryToEdit({ id, name, color, icon }))
  }

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 h-full'>
      <Header
        title='Aktywne kategorie'
        addon={`Ilość kategorii: ${data.length}`}
        icon={'bx-file'}
      />
      <table className='min-w-full divide-y divide-gray-200 h-2'>
        <thead className='bg-white border-b-[2.5px] border-gray-200'>
          <tr className='text-secondary'>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Lp.</th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>
              Nazwa kategorii
            </th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>
              Kolor identyfikacyjny
            </th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>
              Przypisana ikona
            </th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Akcje</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200 text-secondary' ref={parent}>
          {data.length > 0 &&
            data.map((item, index) => (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.name}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div
                    className={`ml-4 p-1 w-5 h-5 rounded-xl`}
                    style={{ backgroundColor: item.color }}
                  ></div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-xl'>
                  <i className={`bx ${item.icon} ml-4`}></i>
                </td>
                <td className='pl-6 pr-1 py-4 whitespace-nowrap'>
                  <span
                    className='px-2 py-1 cursor-pointer hover:text-blue-400'
                    onClick={() => handleEditCategory({ ...item })}
                  >
                    <i className='bx bxs-edit'></i>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesList
