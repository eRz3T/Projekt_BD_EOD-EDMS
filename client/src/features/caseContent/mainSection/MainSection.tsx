import Header from '@/shared/components/Header/Header'
import TextEditor from '@/shared/components/TextEditor/TextEditor'
import FileUploadInput from '@/shared/components/FileUploadInput/FileUploadInput'
import CasePost from './casePost/CasePost'
import { IMainSectionProps } from './MainSection.types'

const MainSection = ({ setIsNewPost, isNewPost }: IMainSectionProps) => {
  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 h-full'>
      <Header
        icon='bx-file'
        title='Wniosek o przyznanie dofinansowania'
        addon='ID Sprawy: 0c9aded5f2fe318492be4bff869cbdf'
      />
      <CasePost />
      <CasePost />
      <CasePost />
      <CasePost />

      {isNewPost && (
        <div className='flex flex-col w-full'>
          <span className='my-4 min-w-full border'></span>
          <div className=' inline-flex items-center justify-between'>
            <h5 className='my-4 text-primary font-semibold text-lg '>Dodaj komentarz (plik)</h5>
            <div>
              {' '}
              <button
                className=' bg-red-400 text-white text-sm px-4 py-2 rounded-md font-medium'
                onClick={() => setIsNewPost(false)}
              >
                Anuluj
              </button>
            </div>
          </div>

          <TextEditor />

          <FileUploadInput />

          <button className='bg-blueish text-white text-sm px-4 py-2 mt-4 rounded-md font-medium'>
            Wyślij
          </button>
        </div>
      )}
    </div>
  )
}

export default MainSection
