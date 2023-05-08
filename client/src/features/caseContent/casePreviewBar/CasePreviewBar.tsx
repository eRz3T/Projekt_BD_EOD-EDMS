import Header from '@/shared/components/Header/Header'
import docImg from '@/assets/images/file_icons/file_doc.png'
import pdfImg from '@/assets/images/file_icons/file_pdf.png'
import { ICasePreviewBarProps } from './CasePreviewBar.types'
import { useEffect } from 'react'

const CasePreviewBar = ({ setIsNewPost, isNewPost }: ICasePreviewBarProps) => {
  useEffect(() => {
    isNewPost &&
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
  }, [isNewPost])

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md mx-4 min-h-[60vh] sticky top-[116px]'>
      <Header title='Podgląd sprawy' />
      <h5>Aktualnie przypisano: Olga Kornelska</h5>
      <p>Data otrzymania: 19.03.2023</p>
      <button
        className={`text-white text-sm mt-4 px-4 py-2 rounded-md font-medium w-full ${
          isNewPost ? 'bg-red-400' : 'bg-blueish'
        }`}
        onClick={() => setIsNewPost(!isNewPost)}
      >
        {isNewPost ? 'Anuluj komentarz' : 'Dodaj komentarz (plik)'}
      </button>

      <h5 className='mt-4 mb-2'>Przypisane pliki:</h5>
      <div>
        <div className='flex items-center gap-4  border-2 p-2 rounded-md'>
          <img src={docImg} alt='Doc document file' width={32} />
          <p className='text-secondary'>Formularz wniosku o przyznanie dofinansowania</p>
        </div>
        <div className='flex items-center gap-4 mt-4 border-2 p-2 rounded-md'>
          <img src={pdfImg} alt='Doc document file' width={32} />
          <p className='text-secondary'>Zaświadczenie o dochodach</p>
        </div>
      </div>
    </div>
  )
}

export default CasePreviewBar
