import fileDocxIcon from '@/assets/images/file_icons/file_docx.png'
import { trimText } from '@/shared/utilities/textTrimmer'

interface ObservedTileProps {
  title: string
  assignedTo: string
  status: string
}

const ObservedTile = ({ title, assignedTo, status }: ObservedTileProps) => {
  return (
    <div className='flex bg-white rounded-md p-2'>
      <div className='w-14 h-14 ml-3'>
        <img src={fileDocxIcon} alt='Docx icon' />
      </div>
      <span className='w-[3px] min-h-full bg-gray-200 mx-5'></span>
      <div>
        <h5 className='text-secondary text-lg'>{trimText(title, 46)}</h5>
        <p className='text-secondary'>
          Przypisany: <span className='text-primary font-medium'>{assignedTo}</span>
        </p>
        <p className='text-secondary'>
          status: <span className='text-purple-500 font-medium'>{status}</span>
        </p>
      </div>
    </div>
  )
}

export default ObservedTile
