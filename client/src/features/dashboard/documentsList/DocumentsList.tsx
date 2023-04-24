import moment from 'moment'
import { documents } from './dummyData'
import { trimText } from '@/shared/utilities/textTrimmer'
import Tooltip from '@/shared/components/Tooltip/Tooltip'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { setObservedDocuments } from '@/core/store/documents/documentsSlice'
import { selectObservedDocuments } from '@/core/store/documents/documentsSelectors'
import { enqueueSnackbar } from 'notistack'

interface IDocument {
  id: number
  name: string
  receiveDate: Date
  expiryDate: Date
  createdBy: string
}

const DocumentsList = ({ data }: { data: IDocument[] }) => {
  const dispatch = useAppDispatch()
  const observedDocuments = useAppSelector(selectObservedDocuments)
  documents.map((doc) => console.log(moment(doc.expiryDate).format('YYYY-MM-DD')))

  const handleObserveDocument = (index: number) => {
    const pickedDocument = documents[index]
    !observedDocuments.includes(pickedDocument)
      ? dispatch(setObservedDocuments(pickedDocument))
      : enqueueSnackbar('Już obserwujesz ten dokument', { variant: 'error' })
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
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className='px-6 py-4 whitespace-nowrap'>{item.id}</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {' '}
                <Tooltip label={trimText(item.name, 20)} tooltipContent={item.name} />{' '}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {item.receiveDate.toLocaleDateString()}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {item.expiryDate.toLocaleDateString()}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>{item.createdBy}</td>
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
