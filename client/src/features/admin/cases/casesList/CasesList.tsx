import { setCaseActionType, setCaseToEdit } from '@/core/store/cases/casesSlice'
import Header from '@/shared/components/Header/Header'
import Tooltip from '@/shared/components/Tooltip/Tooltip'
import { useAppDispatch } from '@/shared/hooks/useStore'
import { IAdminCase } from '@/shared/types/cases'
import { trimText } from '@/shared/utilities/textTrimmer'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

export const CasesList = ({ data, noActions }: { data: IAdminCase[]; noActions?: boolean }) => {
  const dispatch = useAppDispatch()
  const [parent] = useAutoAnimate()
  const navigate = useNavigate()
  const sortedCases = [...data].sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
    return dateB - dateA
  })

  const handleEditCase = (caseData: IAdminCase) => {
    dispatch(setCaseActionType('edit'))
    dispatch(setCaseToEdit(caseData))
  }

  const handleViewCase = (caseId: string) => {
    navigate(`/case/${caseId}`, {
      state: 'noEdit',
    })
  }

  return (
    <div className='overflow-x-hidden bg-white p-4 rounded-md m-4 h-full'>
      <Header
        title='Baza spraw'
        icon={'bx-file'}
        subtitle={noActions ? 'Archiwalne sprawy' : 'Aktualne sprawy'}
        addon={`Liczba spraw: ${data.length}`}
      />
      <table className='min-w-full divide-y divide-gray-200 h-2'>
        <thead className='bg-white border-b-[2.5px] border-gray-200'>
          <tr className='text-secondary'>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Lp.</th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>
              Utworzono przez
            </th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Tytuł</th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Opis</th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Utworzono</th>
            {!noActions && (
              <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Akcje</th>
            )}
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200 text-secondary' ref={parent}>
          {sortedCases.length > 0 &&
            sortedCases.map((item, index) => (
              <tr key={item.id} onClick={() => handleViewCase(item.id)} className='cursor-pointer'>
                <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.created_by_details}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Tooltip label={trimText(item.title, 20)} tooltipContent={item.title} />{' '}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {' '}
                  <Tooltip
                    label={trimText(item.description, 20)}
                    tooltipContent={item.description}
                  />{' '}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {moment(item.created_at).format('YYYY-MM-DD')}
                </td>
                {!noActions && (
                  <td className='pl-6 pr-1 py-4 whitespace-nowrap'>
                    <span
                      className='px-2 py-1 cursor-pointer hover:text-blue-400'
                      onClick={() => handleEditCase(item)}
                    >
                      <i className='bx bxs-edit'></i>
                    </span>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
