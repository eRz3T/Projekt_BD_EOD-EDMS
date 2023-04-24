import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import ObservedTile from './ObservedTile'
import { selectObservedDocuments } from '@/core/store/documents/documentsSelectors'
import { resetObservedDocuments } from '@/core/store/documents/documentsSlice'

const ObservedDocuments = () => {
  const dispatch = useAppDispatch()
  const observedDocuments = useAppSelector(selectObservedDocuments)

  return (
    <div className='bg-violets mt-4 mr-4 h-full rounded-md '>
      <div className='bg-white px-3 py-5 w-full rounded-t-md flex items-center justify-between'>
        <h3 className='font-medium'>
          <i className='bx bx-bookmark-plus'></i> Obserwowane:{' '}
          <span className='text-blueish'>{observedDocuments.length}</span>
        </h3>
        <button
          className='bg-blueish text-white text-sm px-4 py-2 rounded-md font-medium'
          onClick={() => dispatch(resetObservedDocuments())}
        >
          Odznacz
        </button>
      </div>
      <div className='flex flex-col gap-3 p-3'>
        {observedDocuments.length > 0 &&
          observedDocuments.map((document) => (
            <ObservedTile
              title={document.name}
              assignedTo={document.assignedTo}
              status={document.status}
            />
          ))}
      </div>
    </div>
  )
}

export default ObservedDocuments
