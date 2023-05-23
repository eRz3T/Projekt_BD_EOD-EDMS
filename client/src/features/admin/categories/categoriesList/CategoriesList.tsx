import { ICategory } from '@/pages/admin/Categories'
import Header from '@/shared/components/Header/Header'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const CategoriesList = ({ data }: { data: ICategory[] }) => {
  const [parent] = useAutoAnimate()

  const handleEditCategory = () => {}
  const handleDeleteCategory = () => {}

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
                    style={{ backgroundColor: item.IDColor }}
                  ></div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-xl'>
                  <i className={`bx ${item.icon} ml-4`}></i>
                </td>
                <td className='pl-6 pr-1 py-4 whitespace-nowrap'>
                  <span
                    className='px-2 py-1 cursor-pointer hover:text-blue-400'
                    onClick={handleEditCategory}
                  >
                    <i className='bx bxs-edit'></i>
                  </span>
                  <span
                    className='px-2 py-1 ml-2 cursor-pointer hover:text-red-400'
                    onClick={handleDeleteCategory}
                  >
                    <i className='bx bx-trash'></i>
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
