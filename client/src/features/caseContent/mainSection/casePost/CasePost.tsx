import docImg from '@/assets/images/file_icons/file_doc.png'

const CasePost = () => {
  return (
    <article className='flex flex-col mt-6'>
      <span className='w-full border'></span>
      <div className='flex flex-row mt-4'>
        <div className='flex-[0.27] flex items-center space-x-2 pl-2 self-start'>
          <div className='relative'>
            <img
              src='https://boredhumans.b-cdn.net/faces2/356.jpg'
              alt='User'
              className='h-12 w-12 rounded-full'
            />
            <span className='absolute right-0 bottom-0 rounded-full w-3 h-3 bg-green-500 border-solid border border-white'></span>
          </div>
          <div className='pl-2'>
            <span className='block font-semibold text-lg text-slate-900'>Tomasz Nowak</span>
            <span className='text-sm text-slate-600'>Dział prawny</span>
          </div>
        </div>

        <div className='flex-[0.73]'>
          <p>Data utworzenia: 17.03.2023 r.</p>
          <p className='text-secondary my-2'>
            Cras velit metus, viverra tincidunt tortor pulvinar, fermentum vehicula nisl. Nulla
            aliquam mattis lacinia. Quisque sem massa, semper in rutrum eu, convallis non leo. Cras
            sit amet efficitur dui, non porta diam. Nunc malesuada libero erat, non malesuada massa
            tempus ac.
          </p>
          <p>Dodane pliki:</p>
          <div>
            <div className='flex items-center gap-4 mt-4 border-2 p-2 rounded-md'>
              <img src={docImg} alt='Doc document file' width={32} />
              <p className='text-secondary'>Formularz wniosku o przyznanie dofinansowania</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CasePost
