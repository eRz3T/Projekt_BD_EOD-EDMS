import { useEffect } from 'react'
import moment from 'moment'

import Header from '@/shared/components/Header/Header'
import File from '@/shared/components/File/File'
import { ICasePreviewBarProps } from './CasePreviewBar.types'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { getFilesForCase } from '@/core/store/cases/casesSlice'
import { selectCaseFiles } from '@/core/store/cases/casesSelectors'
import { handleFileDownload } from '@/shared/utilities/downloadFile'

const CasePreviewBar = ({ setIsNewPost, isNewPost, caseDetails }: ICasePreviewBarProps) => {
  const dispatch = useAppDispatch()
  const caseFiles = useAppSelector(selectCaseFiles)

  useEffect(() => {
    isNewPost &&
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
  }, [isNewPost])

  useEffect(() => {
    if (caseDetails?.id) {
      dispatch(getFilesForCase(caseDetails.id))
    }
  }, [caseDetails?.id])

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md mx-4 min-h-[60vh] max-h-[80vh] sticky top-[116px]'>
      <Header title='Podgląd sprawy' />
      <h5>Aktualnie przypisano: {caseDetails?.assigned_to_details}</h5>
      <p>Data otrzymania: {moment(caseDetails?.updated_at).format('YYYY-MM-DD')}</p>
      <button
        className={`text-white text-sm mt-4 px-4 py-2 rounded-md font-medium w-full ${
          isNewPost ? 'bg-red-400' : 'bg-blueish'
        }`}
        onClick={() => setIsNewPost(!isNewPost)}
      >
        {isNewPost ? 'Anuluj komentarz' : 'Dodaj komentarz (plik)'}
      </button>

      <h5 className='mt-4 mb-2'>Przypisane pliki:</h5>
      <div className='overflow-y-auto'>
        {caseFiles.length > 0 &&
          caseFiles.map((file, index) => (
            <div onClick={() => handleFileDownload(file.filename, file.id)}>
              <File key={index} filename={file.filename} cropName />
            </div>
          ))}
      </div>
    </div>
  )
}

export default CasePreviewBar
