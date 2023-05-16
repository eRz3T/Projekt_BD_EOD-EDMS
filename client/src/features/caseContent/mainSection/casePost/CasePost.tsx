import moment from 'moment'
import { ICasePostProps } from './CasePost.types'
import File from '@/shared/components/File/File'
import { handleFileDownload } from '@/shared/utilities/downloadFile'

const CasePost = ({ username, createdAt, description, filename, fileId }: ICasePostProps) => {
  return (
    <article className='flex flex-col mt-6'>
      <span className='w-full border'></span>
      <div className='flex flex-row mt-4'>
        <div className='flex-[0.27] flex items-center space-x-2 pl-2 self-start'>
          <div className='relative'>
            <img
              src='https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg'
              alt='User'
              className='h-12 w-12 rounded-full'
            />
            <span className='absolute right-0 bottom-0 rounded-full w-3 h-3 bg-green-500 border-solid border border-white'></span>
          </div>
          <div className='pl-2'>
            <span className='block font-semibold text-lg text-slate-900'>{username}</span>
            <span className='text-sm text-slate-600'>Dział prawny</span>
          </div>
        </div>

        <div className='flex-[0.73]'>
          <p>Data utworzenia: {moment(createdAt).format('DD.MM.YYYY')}r.</p>
          <p className='text-secondary my-2'>{description}</p>
          {filename && fileId && (
            <>
              <p>Dodany plik:</p>
              <div onClick={() => handleFileDownload(filename, fileId)}>
                <File fileId={fileId} filename={filename} cropName />
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default CasePost
