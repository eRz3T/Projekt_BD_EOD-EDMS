import moment from 'moment'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

import { trimText } from '@/shared/utilities/textTrimmer'
import Tooltip from '@/shared/components/Tooltip/Tooltip'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { setObservedCases } from '@/core/store/cases/casesSlice'
import { selectObservedCases } from '@/core/store/cases/casesSelectors'
import { ICases } from '@/shared/types/cases'

const DocumentsList = ({ data }: { data: ICases[] }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const observedCases = useAppSelector(selectObservedCases)

  const handleObserveDocument = (index: number) => {
    const pickedDocument = data[index]
    !observedCases.includes(pickedDocument)
      ? dispatch(setObservedCases(pickedDocument))
      : enqueueSnackbar('Już obserwujesz ten dokument', { variant: 'error' })
  }

  const handleGoToCase = (caseId: string) => {
    navigate(`/case/${caseId}`)
  }

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 h-full'>
      <div className='flex justify-between my-3 items-center'>
        <h3 className='text-xl'>
          <i className='bx bx-file mr-2'></i>Aktualne dokumenty
        </h3>
        <p className='text-sm text-blueish'>Ilość wpisów: {data.length}</p>
      </div>
      <table className='min-w-full divide-y divide-gray-200 h-2'>
        <thead className='bg-white border-b-[2.5px] border-gray-200'>
          <tr className='text-secondary'>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Lp.</th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>
              Nazwa dokumentu
            </th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>
              Data otrzymania
            </th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>
              Data wygaśnięcia
            </th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>
              Utworzony przez
            </th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'> </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200 text-secondary'>
          {data.length > 0 &&
            data.map((item, index) => (
              <tr key={item.id} className=' hover:opacity-80 cursor-pointer'>
                <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                <td className='px-6 py-4 whitespace-nowrap' onClick={() => handleGoToCase(item.id)}>
                  {' '}
                  <Tooltip label={trimText(item.title, 20)} tooltipContent={item.title} />{' '}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {moment(item.updated_at).format('YYYY-MM-DD')}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {moment(item.expires_at).format('YYYY-MM-DD')}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.created_by_details}</td>
                <td
                  className='px-6 py-4 whitespace-nowrap cursor-pointer'
                  onClick={() => handleObserveDocument(index)}
                >
                  <i className='bx bx-bookmark-plus'></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default DocumentsList
