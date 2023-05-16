import { IFileProps } from './File.types'
import { handleFileExtensionIcon } from './File.utilities'

const File = ({ filename, fileId, cropName }: IFileProps) => {
  return (
    <div className='flex items-center gap-4 mt-4 border-2 p-2 rounded-md cursor-pointer overflow-hidden'>
      <img src={handleFileExtensionIcon(filename)} alt='Doc document file' width={32} />
      <p className='text-secondary text-ellipsis'>
        {cropName ? filename.split('-').slice(5).join('-') : filename}
      </p>
    </div>
  )
}

export default File
