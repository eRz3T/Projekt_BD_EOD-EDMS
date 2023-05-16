import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import ObservedTile from './ObservedTile'
import { selectObservedCases } from '@/core/store/cases/casesSelectors'
import { resetObservedCases } from '@/core/store/cases/casesSlice'

const ObservedDocuments = () => {
  const dispatch = useAppDispatch()
  const observedCases = useAppSelector(selectObservedCases)

  return (
    <div className='bg-violets mt-4 mr-4 h-full rounded-md '>
      <div className='bg-white px-3 py-5 w-full rounded-t-md flex items-center justify-between'>
        <h3 className='font-medium'>
          <i className='bx bx-bookmark-plus'></i> Obserwowane:{' '}
          <span className='text-blueish'>{observedCases.length}</span>
        </h3>
        <button
          className='bg-blueish text-white text-sm px-4 py-2 rounded-md font-medium'
          onClick={() => dispatch(resetObservedCases())}
        >
          Odznacz
        </button>
      </div>
      <div className='flex flex-col gap-3 p-3'>
        {observedCases.length > 0 &&
          observedCases.map((document) => (
            <ObservedTile
              key={document.id}
              title={document.title}
              assignedTo={document.assigned_to_details}
              status={''}
            />
          ))}
      </div>
    </div>
  )
}

export default ObservedDocuments
